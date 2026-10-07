import {
  BucketAlreadyOwnedByYou,
  CreateBucketCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import {AppDb, DrizzleService} from '../DrizzleService/DrizzleService';
import {ModelService} from '../../types/ModelService/ModelService';
import {SQL, and, desc, eq, inArray} from 'drizzle-orm';
import {PgColumn} from 'drizzle-orm/pg-core';
import {ImageFilter} from './types/ImageFilter';
import {Logger} from '../../utils/Logger/Logger';
import {ImageType} from '../../types/ImageType';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {ManagedImage} from './types/ManagedImage';
import {IImageService} from './types/IImageService';
import {ImageRow} from '../DrizzleService/types/ImageRow';
import {ImageUpsertDto} from './types/ImageUpsertDto';
import {randomUUID} from 'crypto';

export class ManagedImageService
extends ModelService<string, ImageRow, ManagedImage, ImageFilter>
implements IImageService<ManagedImage, string, ImageFilter> {
  // image ids are stored in a uuid column, so anything else has to stay out of the lookup
  protected static uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  protected bucket = 'gymtracker-images-23';
  protected s3: S3Client;
  protected logger = new Logger(ManagedImageService.name);

  constructor(drizzle: DrizzleService) {
    super(drizzle);
    this.s3 = new S3Client({});
  }

  /**
   * File names are stored in the table exactly as they are named in the bucket, e.g. 'Bench+Press-a.jpg'.
   * Such urls can't be requested over http, so the name is percent-encoded before it leaves the service.
   * Decoding first keeps the result the same for names that are stored encoded already.
   */
  protected encodeUrl(url: string): string {
    const separatorIndex = url.lastIndexOf('/');
    if (separatorIndex < 0) {
      return url;
    }
    const origin = url.substring(0, separatorIndex + 1);
    const name = url.substring(separatorIndex + 1);
    try {
      return origin + encodeURIComponent(decodeURIComponent(name));
    } catch {
      // Name contains a stray '%' and can't be decoded, so it's treated as a raw key
      return origin + encodeURIComponent(name);
    }
  }

  /**
   * Turns an encoded url back into the bucket key it was made from, so rows can be looked up by url.
   */
  protected decodeUrl(url: string): string {
    const separatorIndex = url.lastIndexOf('/');
    if (separatorIndex < 0) {
      return url;
    }
    const origin = url.substring(0, separatorIndex + 1);
    const name = url.substring(separatorIndex + 1);
    try {
      return origin + decodeURIComponent(name);
    } catch {
      return url;
    }
  }

  override async deleteById(id: string): Promise<void> {
    this.logger.info(`Deleting image '${id}'`);
    const db = await this.drizzle.getDb();
    // Urls are encoded on the way out, so the bucket key can only be taken from the row itself
    const row = await db.query.images.findFirst({where: (t, op) => op.eq(t.id, id)});
    if (!row) {
      throw new Error('Image not found');
    }
    const fileName = row.url.split('/').pop();
    if (!fileName) {
      throw new Error('Image URL is invalid. No file name found.');
    }
    await this.deleteFileFromS3(fileName);
    super.deleteById(id);
  }

  protected async fileExistsInS3(name: string): Promise<boolean> {
    try {
      await this.s3.send(
      new HeadObjectCommand({
        Bucket: this.bucket,
        Key: name,
      })
    );
      return true;
    } catch (err: unknown) {
      if (err instanceof S3ServiceException && err.name === 'NotFound') {
        return false;
      }
      throw err;
    }
  }

  /**
   * Delete a file from S3 bucket
   * @param bucket - The S3 bucket name
   * @param name - The name of the file to delete
   */
  protected async deleteFileFromS3(name: string) {
    this.logger.info('Checking if image exists on S3');
    const exists = await this.fileExistsInS3(name);
    if (!exists) {
      this.logger.info("Image doesn't exist, throwing");
      throw new Error(`Image doesn't exist '${name}'`);
    }

    this.logger.info('Deleting from S3');
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: name,
    });
    const response = await this.s3.send(command);
    this.logger.info('S3 Response: ', {name, response});
  }

  /**
   * Bucket keys are always the encoded form of the name that was handed to create, so a lookup that only tries the
   * raw name can never find a row this service stored itself. Both forms are searched.
   */
  async getImageByName(name: string): Promise<ManagedImage| null> {
    const db = await this.drizzle.getDb();
    const image = await this.getRowByName(db, name);
    if (!image) {
      return null;
    }
    const decorated = await this.decorateRows([image]);
    return decorated[0] ?? null;
  }

  async getImageByUrl(url: string, imageType?: ImageType): Promise<ManagedImage | null> {
    const db = await this.drizzle.getDb();
    // File names are stored the way they are named in the bucket, but callers only ever see encoded urls
    const urls = [...new Set([url, this.decodeUrl(url)])];
    const image = await db.query.images.findFirst({
      where: (t, op) => op.and(
        op.inArray(t.url, urls),
        imageType ? op.eq(t.imageType, imageType) : undefined,
      ),
    });
    if (!image) {
      return null;
    }
    const decorated = await this.decorateRows([image]);
    return decorated[0] ?? null;
  }

  generateUrl(name: string): string {
    return `https://${this.bucket}.s3.eu-central-1.amazonaws.com/${name}`;
  }

  /**
   * Names are stored as bucket keys, which are always the encoded form of the name a caller passed to create.
   */
  protected encodeName(name: string): string {
    return encodeURIComponent(name.replaceAll(' ', '-'));
  }

  async createFromFile(file: Buffer, name: string, imageType: ImageType): Promise<ManagedImage> {
    name = this.encodeName(name);
    // the insert is awaited before the upload is started, so a rejected query can't become an unhandled rejection
    const image = await this.saveImageToDb(name, imageType);
    // we don't automatically create buckets anymore
    // await this.createBucket(this.bucket);
    await this.uploadFile(file, this.bucket, name);
    return image;
  }

  /**
   * Resolves an image a sync client sent, which is the only place the device naming rule lives:
   * clients name uploaded files with ids they generated themselves, so the same file arrives on every sync.
   */
  async resolveUpsertedImage(image: ImageUpsertDto, imageType: ImageType): Promise<ManagedImage | null> {
    if (image.isDeleted) {
      return null;
    }
    // ids are generated on devices, where they name the uploaded file, so images sent again are reused
    const uploaded = await this.getImageByName(image.id);
    if (uploaded) {
      return uploaded;
    }
    if (image.data) {
      return await this.getOrCreateFromBase64(image.data, image.id, imageType);
    }
    // images pulled from the server come back named by their stored id, without the data
    if (!ManagedImageService.uuidPattern.test(image.id)) {
      return null;
    }
    return await this.getById(image.id);
  }

  /**
   * Stores the file under a name that may already be taken by the same file, which is what a re-sent image is.
   * The row already stored is reused instead of raising a unique url violation, and the file is uploaded only
   * when the row is new, since a stored row means the object is already in the bucket.
   */
  protected async getOrCreateFromFile(file: Buffer, name: string, imageType: ImageType): Promise<ManagedImage> {
    name = this.encodeName(name);
    const db = await this.drizzle.getDb();
    const inserted = await db.insert(db._.fullSchema.images).values({
      id: randomUUID(),
      url: this.generateUrl(name),
      imageType: imageType,
      createdAt: new Date(),
    }).onConflictDoNothing({target: db._.fullSchema.images.url}).returning();
    const row = inserted[0] ?? await this.getRowByName(db, name);
    if (!row) {
      throw new Error("Images wasn't saved in DB");
    }
    if (inserted[0]) {
      await this.uploadFile(file, this.bucket, name);
    }
    const [stored] = await this.decorateRows([row]);
    if (!stored) {
      throw new Error("Images wasn't saved in DB"); // never
    }
    return stored;
  }

  protected async getOrCreateFromBase64(data: string, name: string, imageType: ImageType): Promise<ManagedImage> {
    const base64Data = data.replace(/^data:image\/\w+;base64,/, ''); // strip header
    const buffer = Buffer.from(base64Data, 'base64');
    return this.getOrCreateFromFile(buffer, name, imageType);
  }

  async createFromUrl(href: string, name: string, imageType: ImageType): Promise<ManagedImage> {
    const base64Data = await this.getImageData(href);
    return await this.createFromBase64(base64Data, name, imageType);
  }

  async getImageData(href: string): Promise<string> {
    const file = await fetch(href);
    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');
    return base64Data;
  }
  async createFromBase64(data: string, name: string, imageType: ImageType) {
    const base64Data = data.replace(/^data:image\/\w+;base64,/, ''); // strip header
    const buffer = Buffer.from(base64Data, 'base64');
    return this.createFromFile(buffer, name, imageType);
  }

  /**
   * Creates a row for a name that must not be stored yet. A url that is already taken is a caller error,
   * which getOrCreateFromFile exists to handle.
   */
  protected async saveImageToDb(name: string, imageType: ImageType): Promise<ManagedImage> {
    const db = await this.drizzle.getDb();
    const inserted = await db.insert(db._.fullSchema.images).values({
      id: randomUUID(),
      url: this.generateUrl(name),
      imageType: imageType,
      createdAt: new Date(),
    }).returning();
    const result = inserted[0];
    if (!result) {
      throw new Error("Images wasn't saved in DB");
    }
    return result;
  }

  protected async getRowByName(db: AppDb, name: string): Promise<ImageRow | undefined> {
    const urls = [...new Set([this.generateUrl(name), this.generateUrl(this.encodeName(name))])];
    const rows = await db.select().from(db._.fullSchema.images)
      .where(inArray(db._.fullSchema.images.url, urls))
      .limit(1);
    return rows[0];
  }

  protected async uploadFile(file: Buffer<ArrayBufferLike>, bucket: string, name: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: name,
        Body: file,
        ACL: 'public-read',
      });
      await this.s3.send(command);
    } catch (caught) {
      if (caught instanceof S3ServiceException) {
        console.error(`Error from S3 while uploading object to ${this.bucket}.  ${caught.name}: ${caught.message}`);
      }
      throw caught;
    }
  }

  async getAll(params: {id: string[]; perPage: number; page?: number;}): Promise<PaginatedResult<ManagedImage>> {
    const db = await this.drizzle.getDb();
    const page = params?.page ?? 1;
    const limit = params?.perPage ?? 30;
    const offset = (page - 1) * limit;
    const where = and(
      params?.id ? inArray(this.getTable().id, params.id) : undefined,
    );
    const rows = await db.select().from(this.getTable()).where(where).limit(limit).offset(offset);
    return {
      items: await this.decorateRows(rows),
      info: {
        page,
        count: rows.length,
        pageSize: limit,
      },
    };
  }

  protected async createBucket(name: string) {
    const bucket = new CreateBucketCommand({Bucket: name});
    try {
      await this.s3.send(bucket);
    } catch (e: unknown) {
      if (e instanceof BucketAlreadyOwnedByYou) {
        return;
      }
      throw e;
    }
  }

  protected override getTable() {
    return this.drizzle.getSchema().images;
  }
  protected override getWhere(params: Partial<ImageFilter>): SQL<unknown> | undefined {
    ;
    const where = and(
      params.ids ? inArray(this.getTable().id, params.ids) : undefined,
      params.imageType ? eq(this.getTable().imageType, params.imageType) : undefined,
      params.search ? this.generateLikeConditions(this.getTable().url, params.search) : undefined
    );
    return where;
  }

  protected override async decorateRows(rows: ManagedImage[]):Promise<ManagedImage[]> {
    return rows.map((row) => {
      const image: ManagedImage = {
        id: row.id,
        url: this.encodeUrl(row.url),
        imageType: row.imageType,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        userId: row.userId,
        deletedAt: row.deletedAt,
      };
      return image;
    });
  }

  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().id);
  }
}

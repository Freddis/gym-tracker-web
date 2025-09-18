import {
  BucketAlreadyOwnedByYou,
  CreateBucketCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {ImageRow} from '../DrizzleService/types/ImageRow';
import {ModelService} from '../../types/ModelService/ModelService';
import {Image} from './types/Image';
import {SQL, and, desc, inArray} from 'drizzle-orm';
import {PgColumn} from 'drizzle-orm/pg-core';
import {ImageFilter} from './types/ImageFilter';
import {Logger} from '../../utils/Logger/Logger';

export class ImageService extends ModelService<ImageRow, Image, ImageFilter> {
  protected bucket = 'gymtracker-images-23';
  protected s3: S3Client;
  protected logger = new Logger(ImageService.name);

  constructor(drizzle: DrizzleService) {
    super(drizzle);
    this.s3 = new S3Client({});
  }

  override async deleteById(id: number): Promise<void> {
    this.logger.info(`Deleting image '${id}'`);
    const image = await this.getById(id);
    if (!image) {
      throw new Error('Image not found');
    }
    const fileName = image.url!.split('/').pop()!;
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

  async getImageByName(name: string): Promise<ImageRow| null> {
    const db = await this.drizzle.getDb();
    const url = this.generateUrl(name);
    const image = await db.query.images.findFirst({
      where: (t, op) => op.eq(t.url, url),
    });
    return image ?? null;
  }

  generateUrl(name: string): string {
    return `https://${this.bucket}.s3.eu-central-1.amazonaws.com/${name}`;
  }

  async createFromFile(file: Buffer, name: string): Promise<ImageRow> {
    name = encodeURIComponent(name);
    const image = this.saveImageToDb(name);
    await this.createBucket(this.bucket);
    await this.uploadFile(file, this.bucket, name);
    return image;
  }

  async createFromBase64(data: string, name: string) {
    const base64Data = data.replace(/^data:image\/\w+;base64,/, ''); // strip header
    const buffer = Buffer.from(base64Data, 'base64');
    return this.createFromFile(buffer, name);
  }

  protected async saveImageToDb(name:string): Promise<ImageRow> {
    const db = await this.drizzle.getDb();
    const inserted = await db.insert(db._.fullSchema.images).values({
      url: this.generateUrl(name),
      createdAt: new Date(),
    }).returning();
    const result = inserted[0];
    if (!result) {
      throw new Error("Images wasn't saved in DB");
    }
    return result;
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
      if (caught instanceof S3ServiceException && caught.name === 'EntityTooLarge') {
        console.error(`Error from S3 while uploading object to ${this.bucket}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`,
      );
      } else if (caught instanceof S3ServiceException) {
        console.error(`Error from S3 while uploading object to ${this.bucket}.  ${caught.name}: ${caught.message}`,);
      } else {
        throw caught;
      }
    }
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
      params.search ? this.generateLikeConditions(this.getTable().url, params.search) : undefined
    );
    return where;
  }


  protected override async decorateRows(rows: ImageRow[]):Promise<Image[]> {
    return rows;
  }
  protected override getOrderBy(): PgColumn | SQL | SQL.Aliased {
    return desc(this.getTable().id);
  }
}

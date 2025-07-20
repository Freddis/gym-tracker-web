import {BucketAlreadyOwnedByYou, CreateBucketCommand, PutObjectCommand, S3Client, S3ServiceException} from '@aws-sdk/client-s3';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {Image} from '../../model/Image/Image';

export class ImageService {
  protected bucket = 'gymtracker-images-23';
  protected drizzle: DrizzleService;
  protected s3: S3Client;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
    this.s3 = new S3Client({});
  }

  async getImageByName(name: string): Promise<Image| null> {
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

  async createFromFile(file: Buffer, name: string): Promise<Image> {
    const image = this.saveImageToDb(name);
    await this.createBucket(this.bucket);
    await this.uploadFile(file, this.bucket, name);
    return image;
  }

  protected async saveImageToDb(name:string): Promise<Image> {
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
}

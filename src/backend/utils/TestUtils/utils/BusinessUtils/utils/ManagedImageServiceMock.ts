import {ManagedImageService} from '../../../../../services/ImageService/ManagedImageService';

/**
 * Keeps image rows in the database, but leaves the files out of S3, which tests have no access to.
 */
export class ManagedImageServiceMock extends ManagedImageService {
  protected override async uploadFile(file: Buffer<ArrayBufferLike>, bucket: string, name: string): Promise<void> {
    this.logger.info('Uploading mock image', {bucket, name, size: file.length});
  }

  protected override async deleteFileFromS3(name: string): Promise<void> {
    this.logger.info('Deleting mock image', {name});
  }
}

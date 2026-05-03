import {Image} from './types/Image';
import {ImageFilter} from './types/ImageFilter';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {ManagedImageService} from './ManagedImageService';
import {ManagedImage} from './types/ManagedImage';
import {IImageService} from './types/IImageService';
import {ImageType} from '../../types/ImageType';

export class ImageService implements IImageService<Image, number, ImageFilter> {
  private managedImageService: ManagedImageService;

  constructor(managedImageService: ManagedImageService) {
    this.managedImageService = managedImageService;
  }

  async getImageByName(name: string): Promise<Image | null> {
    const image = await this.managedImageService.getImageByName(name);
    return image ? this.remapOne(image) : null;
  }

  generateUrl(name: string): string {
    return this.managedImageService.generateUrl(name);
  }

  async createFromFile(file: Buffer, name: string, imageType: ImageType): Promise<Image> {
    const image = await this.managedImageService.createFromFile(file, name, imageType);
    return this.remapOne(image);
  }

  async createFromUrl(href: string, name: string, imageType: ImageType): Promise<Image> {
    const image = await this.managedImageService.createFromUrl(href, name, imageType);
    return this.remapOne(image);
  }

  async getImageData(href: string): Promise<string> {
    const data = await this.managedImageService.getImageData(href);
    return data;
  }

  async createFromBase64(data: string, name: string, imageType: ImageType): Promise<Image> {
    const image = await this.managedImageService.createFromBase64(data, name, imageType);
    return this.remapOne(image);
  }

  async paginate(params: Partial<ImageFilter>): Promise<PaginatedResult<Image>> {
    const result = await this.managedImageService.paginate(params);
    return {
      items: this.remapMany(result.items),
      info: result.info,
    };
  }

  async get(filter: ImageFilter): Promise<Image | null> {
    const result = await this.managedImageService.get(filter);
    return result ? this.remapOne(result) : null;
  }

  async getById(id: number): Promise<Image | null> {
    const result = await this.managedImageService.getById(id);
    return result ? this.remapOne(result) : null;
  }

  async getMany(filter: ImageFilter): Promise<Image[]> {
    const result = await this.managedImageService.getMany(filter);
    return this.remapMany(result);
  }

  async deleteById(id: number): Promise<void> {
    await this.managedImageService.deleteById(id);
  }

  protected remapOne(row: ManagedImage): Image {
    return {
      id: row.id,
      url: row.url,
    };
  }

  protected remapMany(rows: ManagedImage[]): Image[] {
    return rows.map(this.remapOne);
  }
}

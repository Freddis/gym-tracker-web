import {ImageType} from '../../../types/ImageType';
import {EntityService} from '../../../types/ModelService/types/EntityService';
import {Filter} from '../../../types/ModelService/types/Filter';

export interface IImageService<
TModel, TId extends string | number = number, TFilter extends Filter<TId> = Filter<TId>> extends EntityService<TModel, TId, TFilter> {
  getImageByName(name: string): Promise<TModel| null>
  generateUrl(name: string): string;
  createFromFile(file: Buffer, name: string, imageType: ImageType): Promise<TModel>
  createFromUrl(href: string, name: string, imageType: ImageType): Promise<TModel>
  getImageData(href: string): Promise<string>
  createFromBase64(data: string, name: string, imageType: ImageType): Promise<TModel>
}

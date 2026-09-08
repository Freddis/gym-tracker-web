import {ImageType} from '../../../types/ImageType';
import {Filter} from '../../../types/ModelService/types/Filter';

export interface ImageFilter extends Filter<string> {
  search?: string
  imageType?: ImageType
}

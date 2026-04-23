import {nativeEnum} from 'zod';
import {imageRowValidator} from '../../../../DrizzleService/types/ImageRow';
import {Image} from '../../../../ImageService/types/Image';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';
import {ImageType} from '../../../../../types/ImageType';

export const imageValidatorDescriptions: OpenApiDescriptions<Image> = {
  id: 'Id of the image',
  // name: 'Image Name',
  url: 'URL of the image',
  userId: 'Id of the user who uploaded it',
  createdAt: 'Date the creation',
  updatedAt: 'Date of last update',
  deletedAt: 'Date of deletion. Deleted exercises are not accessible to users.',
  imageType: 'Type of object this image attaches to',
};
const imageTypeValidator = nativeEnum(ImageType).openapi({ref: 'Image Type', description: 'Type of object this image attaches to'});
const validator = imageRowValidator.extend({
  imageType: imageTypeValidator,
});
export const imageValidator = RouteFactory.validators.describeShape(validator, imageValidatorDescriptions).openapi({
  description: 'Image record',
  ref: 'Image',
});

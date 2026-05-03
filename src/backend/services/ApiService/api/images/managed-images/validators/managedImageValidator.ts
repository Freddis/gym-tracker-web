import {nativeEnum} from 'zod';
import {ImageType} from '../../../../../../types/ImageType';
import {OpenApiDescriptions} from '../../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../../utils/RouteFactory';
import {ManagedImage} from '../../../../../ImageService/types/ManagedImage';
import {imageRowValidator} from '../../../../../DrizzleService/types/ImageRow';

export const managedImageValidatorDescriptions: OpenApiDescriptions<ManagedImage> = {
  id: 'Id of the image',
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
export const managedImageValidator = RouteFactory.validators.describeShape(validator, managedImageValidatorDescriptions).openapi({
  description: 'Image record',
  ref: 'ManagedImage',
});

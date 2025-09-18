import {imageRowValidator} from '../../../../DrizzleService/types/ImageRow';
import {Image} from '../../../../ImageService/types/Image';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';

export const imageValidatorDescriptions: OpenApiDescriptions<Image> = {
  id: 'Id of the exercise',
  // name: 'Image Name',
  url: 'URL of the image',
  userId: 'Id of the user who uploaded it',
  createdAt: 'Date the creation',
  updatedAt: 'Date of last update',
  deletedAt: 'Date of deletion. Deleted exercises are not accessible to users.',
};

export const imageValidator = RouteFactory.validators.describeShape(imageRowValidator, imageValidatorDescriptions).openapi({
  description: 'Image View for CRM managers',
  ref: 'ManagedImage',

});

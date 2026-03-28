import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {object} from 'zod';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {imageEntryValidator} from './validators/imageEntryValidator';

export const getImage = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Adds new image entry for the user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the image entry'}),
    }),
    response: imageEntryValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.getImageEntry(ctx.viewer.id, ctx.params.path.id);
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return result;
  },
});

import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {object, string} from 'zod';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {postEntryValidator} from './validators/postEntryValidator';

export const getPost = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Adds new post entry for the user',
  path: '/{id}',
  validators: {
    path: object({
      id: string().openapi({description: 'Id of the post entry'}),
    }),
    response: postEntryValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.getPostEntry(ctx.viewer.id, ctx.params.path.id);
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return result;
  },
});

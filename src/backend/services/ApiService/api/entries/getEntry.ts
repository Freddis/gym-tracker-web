import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {entryValidator} from './validators/entryValidator';
import {object, string} from 'zod';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';

export const getEntry = RouteFactory.createRoute({
  type: ApiRouteType.User,
  method: OpenApiMethod.GET,
  path: '/{id}',
  description: 'Returns the list of public entries',
  validators: {
    path: object({
      id: string().openapi({description: 'Id of the entry'}),
    }),
    response: entryValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.get({ids: [ctx.params.path.id], userId: [ctx.viewer.id]});
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return result;
  },
});

import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {foodValidator} from './validators/foodValidator';
import {object, string} from 'zod';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {RouteTag} from '../../types/RouteTag';

export const getFood = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on food for user',
  path: '/{id}',
  tags: [RouteTag.Food],
  operationId: 'getFood',
  validators: {
    path: object({
      id: string().openapi({description: 'Id of the food'}),
    }),
    query: object({
      search: string().optional().openapi({description: 'Search for food by name'}),
      page: RouteFactory.validators.strings.number.optional().default('1').openapi({
        description: 'Page',
      }),
    }),
    response: foodValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.food.getById(ctx.viewer.id, ctx.params.path.id);
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return result;
  },
});

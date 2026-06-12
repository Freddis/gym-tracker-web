import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {foodValidator} from './validators/foodValidator';
import {coerce, object, string} from 'zod';
import {RouteTag} from '../../types/RouteTag';

export const findFood = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Public,
  description: 'Search for food by name',
  path: '/find',
  tags: [RouteTag.Food],
  operationId: 'findFood',
  validators: {
    query: object({
      query: string().optional().openapi({description: 'Query to search for food'}),
      page: coerce.number().optional().openapi({description: 'Page number'}),
    }),
    response: RouteFactory.validators.paginatedResponse(foodValidator).openapi({
      description: 'List of found food',
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.food.findFood({
      query: ctx.params.query.query,
      page: ctx.params.query.page,
    });
    return result;
  },
});

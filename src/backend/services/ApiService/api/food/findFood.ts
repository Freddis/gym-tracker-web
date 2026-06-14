import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {foodValidator} from './validators/foodValidator';
import {object, string} from 'zod';
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
      cursor: string().optional().openapi({description: 'Cursor for pagination'}),
    }),
    response: RouteFactory.cursorResponse(foodValidator).openapi({
      description: 'List of found food',
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.food.findFood({
      query: ctx.params.query.query,
      cursor: ctx.params.query.cursor,
    });
    return result;
  },
});

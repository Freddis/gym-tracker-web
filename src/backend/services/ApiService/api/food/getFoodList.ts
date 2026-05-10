import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {foodValidator} from './validators/foodValidator';
import {object, string} from 'zod';
import {RouteTag} from '../../types/RouteTag';

export const getFoodList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Updates or inserts food for user',
  path: '/',
  tags: [RouteTag.Food],
  operationId: 'getFoodList',
  validators: {
    query: object({
      search: string().optional().openapi({description: 'Search for food by name'}),
      page: RouteFactory.validators.strings.number.optional().default('1').openapi({
        description: 'Page',
      }),
    }),
    response: RouteFactory.validators.paginatedResponse(foodValidator).openapi({
      description: 'List of food',
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.food.paginate(ctx.viewer.id, ctx.params.query);
    console.log(result);
    return result;
  },
});

import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {foodUpsertDtoValidator} from './validators/foodUpsertDtoValidator';
import {foodValidator} from './validators/foodValidator';

export const upsertFood = RouteFactory.createRoute({
  method: OpenApiMethod.PUT,
  type: ApiRouteType.User,
  description: 'Updates or inserts food for user',
  path: '/',
  tags: ['food'],
  operationId: 'upsertFood',
  validators: {
    body: foodUpsertDtoValidator,
    response: foodValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.food.upsert(ctx.viewer.id, ctx.params.body);
    return result;
  },
});

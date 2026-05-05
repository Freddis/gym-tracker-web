import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {foodUpsertDtoValidator} from './validators/foodUpsertDtoValidator';
import {foodValidator} from './validators/foodValidator';
import {EmptyMealError} from '../../../FoodService/types/EmptyMealError';
import {ActionError} from '../../errors/ActionError';
import {ActionErrorCode} from '../../types/ActionErrorCode';

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
    try {
      const result = await ctx.services.models.food.upsert(ctx.viewer.id, ctx.params.body);
      return result;
    } catch (error) {
      if (error instanceof EmptyMealError) {
        throw new ActionError(ActionErrorCode.EmptyMeal);
      }
      throw error;
    }
  },
});

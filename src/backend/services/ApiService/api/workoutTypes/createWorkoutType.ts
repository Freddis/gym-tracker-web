import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutTypeValidator} from './validators/workoutTypeValidator';
import {workoutTypeUpdateDtoValidator} from './validators/workoutTypeUpdateDtoValidator';

export const createWorkoutType = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new workout type for the user',
  path: '/',
  validators: {
    body: workoutTypeUpdateDtoValidator.omit({id: true, userId: true, deletedAt: true, createdAt: true, updatedAt: true}),
    response: workoutTypeValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workoutType.create(ctx.viewer.id, ctx.params.body);
    return result;
  },
});

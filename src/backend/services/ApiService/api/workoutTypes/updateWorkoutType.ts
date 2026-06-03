import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {object, string} from 'zod';
import {workoutTypeValidator} from './validators/workoutTypeValidator';
import {workoutTypeUpdateDtoValidator} from './validators/workoutTypeUpdateDtoValidator';

export const updateWorkoutType = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.User,
  description: 'Updated workout type for the user',
  path: '/{id}',
  validators: {
    path: object({
      id: string().uuid().openapi({description: 'Id of the workout type'}),
    }),
    body: workoutTypeUpdateDtoValidator.omit({id: true, userId: true, deletedAt: true, createdAt: true, updatedAt: true}),
    response: workoutTypeValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workoutType.update(ctx.viewer.id, ctx.params.path.id, ctx.params.body);
    return result;
  },
});

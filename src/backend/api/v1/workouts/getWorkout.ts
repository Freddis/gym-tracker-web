import {OpenApiMethods} from 'strap-on-openapi';
import {z} from 'zod';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {workoutValidator} from '../../../model/Workout/Workout';
import {ActionError} from '../../../services/ApiService/errors/ActionError';
import {ActionErrorCode} from '../../../services/ApiService/types/ActionErrorCode';
import {openApiInstance} from '../../../utils/openApiInstance';


export const getWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.GET,
  type: ApiRouteType.User,
  description: 'Returns data on user workout',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    response: z.object({
      item: workoutValidator,
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.get(ctx.params.path.id, ctx.viewer.id);
    if (!result) {
      throw new ActionError(ActionErrorCode.WorkoutNotFound);
    }
    return {
      item: result,
    };
  },
});

import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {workoutValidator} from 'src/backend/model/Workout/Workout';
import {OpenApiMethods} from 'strap-on-openapi';
import {ActionError} from '../../../../backend/utils/ApiHelper/errors/ActionError';
import {ActionErrorCode} from '../../../../backend/utils/ApiHelper/types/ActionErrorCode';

export const getWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: ApiRouteTypes.User,
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

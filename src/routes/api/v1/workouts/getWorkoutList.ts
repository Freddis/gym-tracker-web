import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {workoutValidator} from 'src/backend/model/Workout/Workout';
import {OpenApiMethods} from 'strap-on-openapi';

export const getWorkoutList = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: ApiRouteTypes.User,
  description: 'Returns list of users workouts',
  path: '/',
  validators: {
    query: z.object({
      updatedAfter: z.date().optional(),
    }),
    response: z.object({
      items: workoutValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.getAll(ctx.viewer.id, ctx.params.query);
    return {
      items: result,
    };
  },
});

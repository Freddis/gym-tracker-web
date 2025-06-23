import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {workoutValidator} from 'src/backend/model/Workout/Workout';
import {OpenApiMethods} from 'strap-on-openapi';

export const getWorkoutList = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: ApiRouteType.User,
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

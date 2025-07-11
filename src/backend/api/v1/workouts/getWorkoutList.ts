import {z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {workoutValidator} from 'src/backend/model/Workout/Workout';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';

export const getWorkoutList = openApi.factory.createRoute({
  method: OpenApiMethod.GET,
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

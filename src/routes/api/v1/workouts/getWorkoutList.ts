import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {workoutValidator} from 'src/backend/model/Workout/Workout';

export const getWorkoutList = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: AppOpenApiRouteTypes.User,
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

import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiError} from 'src/backend/services/OpenApiService/types/errors/OpenApiError';
import {OpenApiErrorCode} from 'src/backend/services/OpenApiService/enums/OpenApiErrorCode';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {workoutValidator} from 'src/backend/model/Workout/Workout';

export const getWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: AppOpenApiRouteTypes.User,
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
      throw new OpenApiError(OpenApiErrorCode.notFound);
    }
    return {
      item: result,
    };
  },
});

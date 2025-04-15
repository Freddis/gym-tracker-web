import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {OpenApiError} from 'src/backend/services/OpenApiService/types/errors/OpenApiError';
import {OpenApiErrorCode} from 'src/backend/services/OpenApiService/enums/OpenApiErrorCode';
import {workoutUpdateDtoValidator} from 'src/backend/model/Workout/WorkoutUpdateDto';

export const updateWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.patch,
  type: AppOpenApiRouteTypes.User,
  description: 'Updates workout of current user',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    body: workoutUpdateDtoValidator,
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    if (!ctx.services.models.workout.hasWriteAccess(ctx.params.path.id, ctx.viewer.id)) {
      throw new OpenApiError(OpenApiErrorCode.unauthorized);
    }
    await ctx.services.models.workout.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});

import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {workoutUpdateDtoValidator} from 'src/backend/model/Workout/WorkoutUpdateDto';
import {ApiError} from '../../../../backend/utils/ApiHelper/errors/ApiError';
import {ApiErrorCode} from '../../../../backend/utils/ApiHelper/types/ApiErrorCode';
import {OpenApiMethods} from 'strap-on-openapi';

export const updateWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.patch,
  type: ApiRouteType.User,
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
      throw new ApiError(ApiErrorCode.Unauthorized);
    }
    await ctx.services.models.workout.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});

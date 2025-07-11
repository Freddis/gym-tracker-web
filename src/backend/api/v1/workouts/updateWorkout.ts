import {z} from 'zod';
import {OpenApiMethod} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {workoutUpdateDtoValidator} from '../../../model/Workout/WorkoutUpdateDto';
import {ApiError} from '../../../services/ApiService/errors/ApiError';
import {ApiErrorCode} from '../../../services/ApiService/types/ApiErrorCode';
import {openApi} from '../../../utils/openApi';


export const updateWorkout = openApi.factory.createRoute({
  method: OpenApiMethod.PATCH,
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

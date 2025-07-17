import {z} from 'zod';
import {OpenApiMethod} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {ApiError} from '../../../services/ApiService/errors/ApiError';
import {ApiErrorCode} from '../../../services/ApiService/types/ApiErrorCode';
import {openApi} from '../../../utils/openApi';

export const deleteWorkout = openApi.factory.createRoute({
  method: OpenApiMethod.DELETE,
  type: ApiRouteType.User,
  description: 'Deletes workout from user',
  path: '/{id}',
  validators: {
    path: z.object({
      id: openApi.validators.strings.number,
    }),
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    if (!ctx.services.models.workout.hasWriteAccess(ctx.params.path.id, ctx.viewer.id)) {
      throw new ApiError(ApiErrorCode.Unauthorized);
    }
    await ctx.services.models.workout.delete(ctx.params.path.id);
    return {success: true};
  },
});

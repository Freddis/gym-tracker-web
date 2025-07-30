import {OpenApiMethod} from 'strap-on-openapi';
import {object, boolean} from 'zod';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';

export const deleteWorkout = RouteFactory.createRoute({
  method: OpenApiMethod.DELETE,
  type: ApiRouteType.User,
  description: 'Deletes workout from user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number,
    }),
    response: object({
      success: boolean(),
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

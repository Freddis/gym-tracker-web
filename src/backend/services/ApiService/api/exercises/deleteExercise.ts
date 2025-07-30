import {OpenApiMethod} from 'strap-on-openapi';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {boolean, object} from 'zod';

export const deleteExercise = RouteFactory.createRoute({
  method: OpenApiMethod.DELETE,
  type: ApiRouteType.User,
  description: 'Deletes exercise from users personal library',
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
    if (!ctx.services.models.exercise.hasWriteAccess(ctx.params.path.id, ctx.viewer.id)) {
      throw new ApiError(ApiErrorCode.Unauthorized);
    }
    await ctx.services.models.exercise.delete(ctx.params.path.id);
    return {success: true};
  },
});

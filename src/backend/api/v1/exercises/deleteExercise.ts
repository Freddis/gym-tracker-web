import {z} from 'zod';
import {OpenApiMethods} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {ApiError} from '../../../services/ApiService/errors/ApiError';
import {ApiErrorCode} from '../../../services/ApiService/types/ApiErrorCode';
import {openApiInstance} from '../../../utils/openApiInstance';

export const deleteExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.DELETE,
  type: ApiRouteType.User,
  description: 'Deletes exercise from users personal library',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    response: z.object({
      success: z.boolean(),
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

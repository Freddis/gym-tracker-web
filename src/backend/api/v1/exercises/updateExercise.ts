import {z} from 'zod';
import {OpenApiMethods} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {ApiError} from '../../../services/ApiService/errors/ApiError';
import {ApiErrorCode} from '../../../services/ApiService/types/ApiErrorCode';
import {openApiInstance} from '../../../utils/openApiInstance';

export const updateExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.PATCH,
  type: ApiRouteType.User,
  description: 'Updates exercise in users personal library',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    body: z.object({
      name: z.string(),
      description: z.string(),
    }),
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    if (!ctx.services.models.exercise.hasWriteAccess(ctx.params.path.id, ctx.viewer.id)) {
      throw new ApiError(ApiErrorCode.Unauthorized);
    }
    await ctx.services.models.exercise.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});

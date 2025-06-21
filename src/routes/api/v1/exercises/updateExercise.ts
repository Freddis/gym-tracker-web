import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {ApiError} from '../../../../backend/utils/ApiHelper/errors/ApiError';
import {ApiErrorCode} from '../../../../backend/utils/ApiHelper/types/ApiErrorCode';
import {OpenApiMethods} from 'strap-on-openapi';

export const updateExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.patch,
  type: ApiRouteTypes.User,
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

import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {OpenApiErrorCode} from 'src/backend/services/OpenApiService/enums/OpenApiErrorCode';
import {OpenApiError} from 'src/backend/services/OpenApiService/types/errors/OpenApiError';

export const deleteExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.delete,
  type: AppOpenApiRouteTypes.User,
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
      throw new OpenApiError(OpenApiErrorCode.unauthorized);
    }
    await ctx.services.models.exercise.delete(ctx.params.path.id);
    return {success: true};
  },
});

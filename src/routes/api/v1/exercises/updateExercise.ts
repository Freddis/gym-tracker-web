import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {OpenApiError} from 'src/backend/services/OpenApiService/types/errors/OpenApiError';
import {OpenApiErrorCode} from 'src/backend/services/OpenApiService/enums/OpenApiErrorCode';

export const updateExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.patch,
  type: AppOpenApiRouteTypes.User,
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
      throw new OpenApiError(OpenApiErrorCode.unauthorized);
    }
    await ctx.services.models.exercise.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});

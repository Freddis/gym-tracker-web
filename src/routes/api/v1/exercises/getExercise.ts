import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiError} from 'src/backend/services/OpenApiService/types/errors/OpenApiError';
import {OpenApiErrorCode} from 'src/backend/services/OpenApiService/enums/OpenApiErrorCode';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {exerciseValidator} from 'src/backend/model/Exercise/Exercise';

export const getExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: AppOpenApiRouteTypes.User,
  description: 'Returns data on an exercise available to the user',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    response: z.object({
      item: exerciseValidator,
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.get(ctx.params.path.id, ctx.viewer.id);
    if (!result) {
      throw new OpenApiError(OpenApiErrorCode.notFound);
    }
    return {
      item: result,
    };
  },
});

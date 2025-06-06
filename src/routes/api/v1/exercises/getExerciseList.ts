import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {exerciseValidator} from 'src/backend/model/Exercise/Exercise';

export const getExerciseList = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: AppOpenApiRouteTypes.User,
  description: 'Returns data on exercises available to the user',
  path: '/',
  validators: {
    query: z.object({
      updatedAfter: z.date().optional(),
    }),
    response: z.object({
      items: exerciseValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getAll(ctx.viewer.id, ctx.params.query);
    return {
      items: result,
    };
  },
});

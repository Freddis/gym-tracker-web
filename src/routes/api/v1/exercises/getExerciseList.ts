import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {EntryType} from 'src/backend/model/Entry/types/EntryType';
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
      page: z.number().optional().default(1),
      type: z.nativeEnum(EntryType).optional(),
    }),
    response: z.object({
      items: exerciseValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getAll(ctx.viewer.id);
    return {
      items: result,
    };
  },
});

import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {exerciseValidator} from 'src/backend/model/Exercise/Exercise';
import {OpenApiMethods} from 'strap-on-openapi';

export const getExerciseList = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: ApiRouteType.User,
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

import {string, z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';
import {exerciseValidator} from './validators/exerciseValidator';

export const getExerciseList = openApi.factory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on exercises available to the user',
  path: '/',
  validators: {
    query: z.object({
      filter: string().optional(),
      updatedAfter: openApi.validators.strings.datetime.optional(),
    }),
    response: z.object({
      items: exerciseValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getAll({
      ...ctx.params.query,
      userId: ctx.viewer.id,
    });
    return {
      items: result,
    };
  },
});

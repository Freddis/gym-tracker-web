import {object} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';
import {getExerciseListQueryValidator} from './validators/getExerciseListQueryValidator';
import {exerciseValidator} from './validators/exerciseValidator';

export const getBuiltInExerciseList = openApi.factory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Public,
  description: 'Returns data on exercises available to the user',
  path: '/built-in',
  validators: {
    query: getExerciseListQueryValidator,
    response: object({
      items: exerciseValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getAll({
      ...ctx.params.query,
      userId: null,
    });
    return {
      items: result,
    };
  },
});

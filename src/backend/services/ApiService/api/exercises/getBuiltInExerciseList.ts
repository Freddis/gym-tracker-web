import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {getExerciseListQueryValidator} from './validators/getExerciseListQueryValidator';
import {exerciseValidator} from './validators/exerciseValidator';
import {RouteFactory} from '../../utils/RouteFactory';

export const getBuiltInExerciseList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Public,
  description: 'Returns data on exercises available to the user',
  path: '/built-in',
  validators: {
    query: getExerciseListQueryValidator,
    response: RouteFactory.validators.paginatedResponse(exerciseValidator).openapi({description: 'List of excercises'}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getPage({
      ...ctx.params.query,
      parentsOnly: true,
      userId: null,
    });
    return result;
  },
});

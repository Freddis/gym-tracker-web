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
    response: RouteFactory.validators.paginatedResponse(exerciseValidator),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getAll({
      ...ctx.params.query,
      userId: null,
    });
    return result;
  },
});

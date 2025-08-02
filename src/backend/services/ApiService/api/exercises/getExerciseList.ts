import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {exerciseValidator} from './validators/exerciseValidator';
import {RouteFactory} from '../../utils/RouteFactory';
import {getExerciseListQueryValidator} from './validators/getExerciseListQueryValidator';

export const getExerciseList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on exercises available to the user',
  path: '/',
  validators: {
    query: getExerciseListQueryValidator,
    response: RouteFactory.validators.paginatedResponse(exerciseValidator).openapi({description: 'List of excercises'}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getAll({
      ...ctx.params.query,
      userId: ctx.viewer.id,
    });
    return result;
  },
});

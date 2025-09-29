import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../../utils/RouteFactory';
import {exerciseValidator} from '../validators/exerciseValidator';
import {getExerciseListQueryValidator} from '../validators/getExerciseListQueryValidator';

export const getManagedExerciseList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Manager,
  description: 'Returns data on exercises',
  path: '/',
  validators: {
    query: getExerciseListQueryValidator.extend({
      userId: RouteFactory.validators.strings.number.optional().openapi({description: 'User ID'}),
    }),
    response: RouteFactory.validators.paginatedResponse(exerciseValidator).openapi({description: 'List of excercises'}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.paginate({
      ...ctx.params.query,
      language: ctx.language,
      parentIds: ctx.params.query.parentsOnly ? null : undefined,
    });
    return result;
  },
});

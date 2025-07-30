import {object, string} from 'zod';
import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {exerciseValidator} from './validators/exerciseValidator';
import {RouteFactory} from '../../utils/RouteFactory';

export const getExerciseList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on exercises available to the user',
  path: '/',
  validators: {
    query: object({
      filter: string().optional(),
      updatedAfter: RouteFactory.validators.strings.datetime.optional(),
    }),
    response: object({
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

import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {object} from 'zod';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutTypeValidator} from './validators/workoutTypeValidator';

export const getWorkoutTypeList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns list of user workout plans',
  path: '/',
  validators: {
    query: object({
      updatedAfter: RouteFactory.validators.strings.datetime.optional().openapi({
        description: 'Only return workouts plan updated after this date. Used for syncing.',
      }),
      page: RouteFactory.validators.strings.number.optional().default('1').openapi({
        description: 'Page',
      }),
    }),
    response: RouteFactory.validators.paginatedResponse(workoutTypeValidator).openapi({
      description: 'List of workout plans',
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workoutType.paginate(ctx.viewer.id, {
      ...ctx.params.query,
      perPage: 10,
    });
    return result;
  },
});

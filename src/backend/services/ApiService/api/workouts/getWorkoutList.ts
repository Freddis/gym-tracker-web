import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {workoutValidator} from './validators/workoutValidator';
import {object} from 'zod';
import {RouteFactory} from '../../utils/RouteFactory';

export const getWorkoutList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns list of users workouts',
  path: '/',
  validators: {
    query: object({
      updatedAfter: RouteFactory.validators.strings.datetime.optional().openapi({
        description: 'Only return workouts updated after this date. Used for syncing.',
      }),
      page: RouteFactory.validators.strings.number.optional().default('1').openapi({
        description: 'Page',
      }),
    }),
    response: RouteFactory.validators.paginatedResponse(workoutValidator).openapi({
      description: 'List of workouts',
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.getAll({
      ...ctx.params.query,
      userId: ctx.viewer.id,
      perPage: 10,
    });

    return result;
  },
});

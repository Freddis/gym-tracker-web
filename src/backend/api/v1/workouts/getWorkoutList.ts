import {z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';
import {workoutValidator} from './validators/workoutValidator';

export const getWorkoutList = openApi.factory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns list of users workouts',
  path: '/',
  validators: {
    query: z.object({
      updatedAfter: openApi.validators.strings.datetime.optional(),
      page: openApi.validators.strings.number.optional().default('1'),
    }),
    response: openApi.validators.paginatedResponse(workoutValidator),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.getAll(ctx.viewer.id, {
      ...ctx.params.query,
      perPage: 10,
    });

    return result;
  },
});

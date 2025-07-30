import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {workoutRowValidator} from 'src/backend/services/DrizzleService/types/WorkoutRow';
import {OpenApiMethod} from 'strap-on-openapi';
import {object} from 'zod';
import {workoutUpsertDtoValidator} from './validators/workoutUpsertDtoValidator';
import {RouteFactory} from '../../utils/RouteFactory';

export const upsertWorkouts = RouteFactory.createRoute({
  method: OpenApiMethod.PUT,
  type: ApiRouteType.User,
  description: 'Updates or inserts workout for user',
  path: '/',
  validators: {
    body: object({
      items: workoutUpsertDtoValidator.array(),
    }),
    response: object({
      items: workoutRowValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.upsert(ctx.viewer.id, ctx.params.body.items);
    return {items: result};
  },
});

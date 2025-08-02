import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {object} from 'zod';
import {workoutUpsertDtoValidator} from './validators/workoutUpsertDtoValidator';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutValidator} from './validators/workoutValidator';

export const upsertWorkouts = RouteFactory.createRoute({
  method: OpenApiMethod.PUT,
  type: ApiRouteType.User,
  description: 'Updates or inserts workout for user',
  path: '/',
  validators: {
    body: object({
      items: workoutUpsertDtoValidator.array().openapi({description: 'List of workouts to update or insert'}),
    }),
    response: object({
      items: workoutValidator.array().openapi({description: 'List of updated or inserted workouts'}),
    }).openapi({description: 'List of updated or inserted workouts'}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.upsert(ctx.viewer.id, ctx.params.body.items);
    return {items: result};
  },
});

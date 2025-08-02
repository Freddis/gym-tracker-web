import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {object} from 'zod';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutValidator} from './validators/workoutValidator';

export const createWorkout = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new workout for the user',
  path: '/',
  validators: {
    body: object({
    }),
    response: workoutValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.create(ctx.viewer.id);
    return result;
  },
});

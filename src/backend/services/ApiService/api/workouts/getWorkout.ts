import {OpenApiMethod} from 'snap-on-openapi';
import {workoutValidator} from './validators/workoutValidator';
import {object} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';

export const getWorkout = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on user workout',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the workout'}),
    }),
    response: object({
      item: workoutValidator,
    }).openapi({description: 'Workout'}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.get(ctx.params.path.id, ctx.viewer.id);
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return {
      item: result,
    };
  },
});

import {OpenApiMethod} from 'strap-on-openapi';
import {workoutValidator} from './validators/workoutValidator';
import {object} from 'zod';
import {ActionError} from '../../errors/ActionError';
import {ActionErrorCode} from '../../types/ActionErrorCode';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';

export const getWorkout = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on user workout',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number,
    }),
    response: object({
      item: workoutValidator,
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.get(ctx.params.path.id, ctx.viewer.id);
    if (!result) {
      throw new ActionError(ActionErrorCode.WorkoutNotFound);
    }
    return {
      item: result,
    };
  },
});

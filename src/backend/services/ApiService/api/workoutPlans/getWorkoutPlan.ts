import {OpenApiMethod} from 'snap-on-openapi';
import {object, string} from 'zod';
import {ActionError} from '../../errors/ActionError';
import {ActionErrorCode} from '../../types/ActionErrorCode';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutPlanValidator} from './validators/workoutPlanValidator';

export const getWorkoutPlan = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on user workout plan',
  path: '/{id}',
  validators: {
    path: object({
      id: string().uuid().openapi({description: 'Id of the workout plan'}),
    }),
    response: workoutPlanValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workoutPlan.getById(ctx.viewer.id, ctx.params.path.id);
    if (!result) {
      throw new ActionError(ActionErrorCode.WorkoutNotFound);
    }
    return result;
  },
});

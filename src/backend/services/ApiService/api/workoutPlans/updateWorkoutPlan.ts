import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutPlanValidator} from './validators/workoutPlanValidator';
import {object} from 'zod';

export const updateWorkoutPlan = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.User,
  description: 'Updated workout plan for the user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the workout plan'}),
    }),
    body: workoutPlanValidator.omit({id: true, userId: true, deletedAt: true, createdAt: true, updatedAt: true}),
    response: workoutPlanValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workoutPlan.update(ctx.viewer.id, ctx.params.path.id, ctx.params.body);
    return result;
  },
});

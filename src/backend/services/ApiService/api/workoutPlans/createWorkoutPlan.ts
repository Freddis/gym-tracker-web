import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutPlanValidator} from './validators/workoutPlanValidator';

export const createWorkoutPlan = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new workout plan for the user',
  path: '/',
  validators: {
    body: workoutPlanValidator.omit({id: true, userId: true, deletedAt: true, createdAt: true, updatedAt: true}),
    response: workoutPlanValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workoutPlan.create({
      ...ctx.params.body,
      userId: ctx.viewer.id,
    });
    return result;
  },
});

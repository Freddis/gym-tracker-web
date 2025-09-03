import {OpenApiMethod} from 'snap-on-openapi';
import {object} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';

export const deleteWorkoutPlan = RouteFactory.createRoute({
  method: OpenApiMethod.DELETE,
  type: ApiRouteType.User,
  description: 'Deletes workout plan',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the workout plan'}),
    }),
    response: object({}).openapi({description: 'Empty response on success'}),
  },
  handler: async (ctx) => {
    await ctx.services.models.workoutPlan.deleteById(ctx.viewer.id, ctx.params.path.id);
    return {};
  },
});

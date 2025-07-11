import {z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';

export const createWorkout = openApi.factory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new workout for the user',
  path: '/',
  validators: {
    body: z.object({
    }),
    response: z.object({
      id: z.number(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.create(ctx.viewer.id);
    return result;
  },
});

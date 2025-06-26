import {z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethods} from 'strap-on-openapi';
import {openApiInstance} from '../../../utils/openApiInstance';

export const createWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.POST,
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

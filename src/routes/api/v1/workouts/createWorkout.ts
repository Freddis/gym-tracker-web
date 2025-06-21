import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {OpenApiMethods} from 'strap-on-openapi';

export const createWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: ApiRouteTypes.User,
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

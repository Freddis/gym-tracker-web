import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';

export const createWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: AppOpenApiRouteTypes.User,
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

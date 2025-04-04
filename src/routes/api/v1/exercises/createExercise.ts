import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';

export const createExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: AppOpenApiRouteTypes.User,
  description: 'Adds new exercise to the user personal library',
  path: '/',
  validators: {
    body: z.object({
      name: z.string(),
    }),
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    await ctx.services.models.exercise.create(ctx.viewer.id, {
      name: ctx.params.body.name,
    });
    return {success: true};
  },
});

import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {OpenApiMethods} from 'strap-on-openapi';

export const createExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: ApiRouteTypes.User,
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

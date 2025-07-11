import {z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';

export const createExercise = openApi.factory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
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

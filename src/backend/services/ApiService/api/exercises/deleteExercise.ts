import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {boolean, object} from 'zod';

export const deleteExercise = RouteFactory.createRoute({
  method: OpenApiMethod.DELETE,
  type: ApiRouteType.User,
  description: 'Deletes exercise from users personal library',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the exercise'}),
    }),
    response: object({
      success: boolean().openapi({
        description: 'Stub for response. Always true since otherwise error is thrown.',
      }),
    }).openapi({description: 'Indicator of successfult operation'}),
  },
  handler: async (ctx) => {
    await ctx.services.models.exercise.delete(ctx.viewer.id, ctx.params.path.id);
    return {success: true};
  },
});

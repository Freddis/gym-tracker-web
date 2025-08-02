import {boolean, object, string} from 'zod';
import {OpenApiMethod} from 'strap-on-openapi';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';

export const updateExercise = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.User,
  description: 'Updates exercise in users personal library',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the excercise'}),
    }),
    body: object({
      name: string().openapi({description: 'Name of the exercise'}),
      description: string().openapi({description: 'Description of the exercise'}),
    }),
    response: object({
      success: boolean().openapi({
        description: 'Stub for response. Always true since otherwise error is thrown.',
      }),
    }).openapi({description: 'Indicator of successfult operation'}),
  },
  handler: async (ctx) => {
    if (!ctx.services.models.exercise.hasWriteAccess(ctx.params.path.id, ctx.viewer.id)) {
      throw new ApiError(ApiErrorCode.Unauthorized);
    }
    await ctx.services.models.exercise.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});

import {z} from 'zod';
import {OpenApiMethod} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {ApiError} from '../../../services/ApiService/errors/ApiError';
import {ApiErrorCode} from '../../../services/ApiService/types/ApiErrorCode';
import {openApi} from '../../../utils/openApi';

export const updateExercise = openApi.factory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.User,
  description: 'Updates exercise in users personal library',
  path: '/{id}',
  validators: {
    path: z.object({
      id: openApi.validators.strings.number,
    }),
    body: z.object({
      name: z.string(),
      description: z.string(),
    }),
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    if (!ctx.services.models.exercise.hasWriteAccess(ctx.params.path.id, ctx.viewer.id)) {
      throw new ApiError(ApiErrorCode.Unauthorized);
    }
    await ctx.services.models.exercise.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});

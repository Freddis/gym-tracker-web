import {OpenApiMethod} from 'strap-on-openapi';
import {exerciseValidator} from './validators/exerciseValidator';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {object} from 'zod';

export const getExercise = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on an exercise available to the user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number,
    }),
    response: object({
      item: exerciseValidator,
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.get(ctx.params.path.id, ctx.viewer.id);
    if (!result) {
      throw new ApiError(ApiErrorCode.UnknownError);
    }
    return {
      item: result,
    };
  },
});

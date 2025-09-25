import {OpenApiMethod} from 'snap-on-openapi';
import {object} from 'zod';
import {ApiError} from '../../../errors/ApiError';
import {ApiErrorCode} from '../../../types/ApiErrorCode';
import {ApiRouteType} from '../../../types/ApiRouteType';
import {RouteFactory} from '../../../utils/RouteFactory';
import {exerciseValidator} from '../validators/exerciseValidator';

export const getManagedExercise = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Manager,
  description: 'Returns data on an exercise',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the excercise'}),
    }),
    response: exerciseValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.exercise.getById(ctx.params.path.id, ctx.language);
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return result;
  },
});

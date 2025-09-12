import {OpenApiMethod} from 'snap-on-openapi';
import {object} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutTypeValidator} from './validators/workoutTypeValidator';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';

export const getWorkoutType = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on user workout type',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the workout type'}),
    }),
    response: workoutTypeValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workoutType.getById(ctx.viewer.id, ctx.params.path.id);
    if (!result) {
      throw new ApiError(ApiErrorCode.NotFound);
    }
    return result;
  },
});

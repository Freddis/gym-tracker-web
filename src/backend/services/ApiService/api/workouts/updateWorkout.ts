
import {OpenApiMethod} from 'strap-on-openapi';
import {object, boolean} from 'zod';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';
import {ApiRouteType} from '../../types/ApiRouteType';
import {workoutUpdateDtoValidator} from './validators/workoutUpdateDtoValidator';
import {RouteFactory} from '../../utils/RouteFactory';


export const updateWorkout = RouteFactory.createRoute({
  method: OpenApiMethod.PATCH,
  type: ApiRouteType.User,
  description: 'Updates workout of current user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({type: 'number'}),
    }),
    body: workoutUpdateDtoValidator,
    response: object({
      success: boolean(),
    }),
  },
  handler: async (ctx) => {
    if (!ctx.services.models.workout.hasWriteAccess(ctx.params.path.id, ctx.viewer.id)) {
      throw new ApiError(ApiErrorCode.Unauthorized);
    }

    await ctx.services.models.workout.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});

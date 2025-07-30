import {OpenApiMethod} from 'strap-on-openapi';
import {z} from 'zod';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';

import {ActionError} from '../../../services/ApiService/errors/ActionError';
import {ActionErrorCode} from '../../../services/ApiService/types/ActionErrorCode';
import {openApi} from '../../../utils/openApi';
import {workoutValidator} from './validators/workoutValidator';


export const getWorkout = openApi.factory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on user workout',
  path: '/{id}',
  validators: {
    path: z.object({
      id: openApi.validators.strings.number,
    }),
    response: z.object({
      item: workoutValidator,
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.get(ctx.params.path.id, ctx.viewer.id);
    if (!result) {
      throw new ActionError(ActionErrorCode.WorkoutNotFound);
    }
    return {
      item: result,
    };
  },
});

import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {workoutValidator} from './validators/workoutValidator';
import {EntryVisibility} from '../../../EntryService/types/EntryVisibility';
import {workoutUpdateDtoValidator} from './validators/workoutUpdateDtoValidator';

export const createWorkout = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new workout for the user',
  path: '/',
  validators: {
    body: workoutUpdateDtoValidator,
    response: workoutValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.entry.createWorkoutEntry(ctx.viewer.id, {
      visibility: EntryVisibility.Public,
      workout: ctx.params.body,
    });
    return result.workout;
  },
});

import {z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {workoutUpsertDtoValidator} from 'src/backend/model/Workout/WorkoutUpsertDto';
import {workoutRowValidator} from 'src/backend/model/Workout/WorkoutRow';
import {OpenApiMethod} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';

export const upsertWorkouts = openApi.factory.createRoute({
  method: OpenApiMethod.PUT,
  type: ApiRouteType.User,
  description: 'Updates or inserts workout for user',
  path: '/',
  validators: {
    body: z.object({
      items: workoutUpsertDtoValidator.array(),
    }),
    response: z.object({
      items: workoutRowValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.workout.upsert(ctx.viewer.id, ctx.params.body.items);
    return {items: result};
  },
});

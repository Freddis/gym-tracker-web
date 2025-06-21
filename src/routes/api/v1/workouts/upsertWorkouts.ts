import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {workoutUpsertDtoValidator} from 'src/backend/model/Workout/WorkoutUpsertDto';
import {workoutRowValidator} from 'src/backend/model/Workout/WorkoutRow';
import {OpenApiMethods} from 'strap-on-openapi';

export const upsertWorkouts = openApiInstance.factory.createRoute({
  method: OpenApiMethods.put,
  type: ApiRouteTypes.User,
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

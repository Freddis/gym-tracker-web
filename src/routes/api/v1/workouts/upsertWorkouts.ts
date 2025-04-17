import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {workoutUpsertDtoValidator} from 'src/backend/model/Workout/WorkoutUpsertDto';
import {workoutRowValidator} from 'src/backend/model/Workout/WorkoutRow';

export const upsertWorkouts = openApiInstance.factory.createRoute({
  method: OpenApiMethods.put,
  type: AppOpenApiRouteTypes.User,
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

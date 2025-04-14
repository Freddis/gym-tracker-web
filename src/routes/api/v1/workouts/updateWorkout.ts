import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {OpenApiError} from 'src/backend/services/OpenApiService/types/errors/OpenApiError';
import {OpenApiErrorCode} from 'src/backend/services/OpenApiService/enums/OpenApiErrorCode';

export const updateWorkout = openApiInstance.factory.createRoute({
  method: OpenApiMethods.patch,
  type: AppOpenApiRouteTypes.User,
  description: 'Updates workout of current user',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    body: z.object({
      start: z.date(),
      end: z.date().nullable(),
      calories: z.number(),
      exercises: z.object({
        id: z.number().optional(),
        exerciseId: z.number(),
        sets: z.object({
          id: z.number().optional(),
          end: z.date().nullable(),
          weight: z.number().nullable(),
          reps: z.number().nullable(),
          start: z.date().nullable(),
        }).array(),
      }).array(),
    }),
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    if (!ctx.services.models.workout.hasWriteAccess(ctx.params.path.id, ctx.viewer.id)) {
      throw new OpenApiError(OpenApiErrorCode.unauthorized);
    }
    await ctx.services.models.workout.update(ctx.params.path.id, ctx.params.body);
    return {success: true};
  },
});

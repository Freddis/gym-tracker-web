import {z} from 'zod';
import {openApiInstance} from '../../../../openApiInstance';
import {dbSchema} from 'src/server/drizzle/db';
import {DrizzleService} from 'src/server/services/DrizzleService/DrizzleService';
import {and, eq} from 'drizzle-orm';
import {AppOpenApiRouteTypes} from 'src/types/AppOpenApiRouteTypes';
import {OpenApiMethods} from 'src/server/services/OpenApiService/enums/OpenApiMethods';

export const deleteExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.delete,
  type: AppOpenApiRouteTypes.User,
  description: 'Deletes exercise to the user personal library',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    const service = new DrizzleService();
    const db = await service.getDb();
    await db.delete(dbSchema.exercises)
      .where(
        and(
          eq(dbSchema.exercises.id, ctx.params.path.id),
          eq(dbSchema.exercises.userId, ctx.viewer.id)
        )
      );

    return {success: true};
  },
});

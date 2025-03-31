import {z} from 'zod';
import {openApiInstance} from '../../../../openApiInstance';
import {dbSchema} from 'src/server/drizzle/db';
import {DrizzleService} from 'src/server/services/DrizzleService/DrizzleService';
import {and, eq} from 'drizzle-orm';
import {OpenApiMethods} from 'src/server/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/types/AppOpenApiRouteTypes';

export const updateExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.patch,
  type: AppOpenApiRouteTypes.User,
  description: 'Adds new exercise to the user personal library',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    body: z.object({
      name: z.string(),
      description: z.string(),
    }),
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    const service = new DrizzleService();
    const db = await service.getDb();
    await db.update(dbSchema.exercises)
      .set({
        name: ctx.params.body.name,
        description: ctx.params.body.description,
        updatedAt: new Date(),
      }).where(
          and(
            eq(dbSchema.exercises.id, ctx.params.path.id),
            eq(dbSchema.exercises.userId, ctx.viewer.id)
          )
      );
    return {success: true};
  },
});

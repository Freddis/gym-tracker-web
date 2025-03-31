import {z} from 'zod';
import {openApiInstance} from '../../../../openApiInstance';
import {dbSchema} from 'src/server/drizzle/db';
import {DrizzleService} from 'src/server/services/DrizzleService/DrizzleService';
import {OpenApiMethods} from 'src/server/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/types/AppOpenApiRouteTypes';

export const createExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: AppOpenApiRouteTypes.User,
  description: 'Adds new exercise to the user personal library',
  path: '/',
  validators: {
    body: z.object({
      name: z.string(),
    }),
    response: z.object({
      success: z.boolean(),
    }),
  },
  handler: async (ctx) => {
    const service = new DrizzleService();
    const db = await service.getDb();
    const entity: typeof dbSchema.exercises.$inferInsert = {
      params: [],
      name: ctx.params.body.name,
      createdAt: new Date(),
      userId: ctx.viewer.id,
      equipmentId: 0,
      images: [],
    };
    await db.insert(dbSchema.exercises).values(entity);
    return {success: true};
  },
});

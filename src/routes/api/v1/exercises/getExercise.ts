import {z} from 'zod';
import {openApiInstance} from '../../../../openApiInstance';
import {dbSchema} from 'src/server/drizzle/db';
import {DrizzleService} from 'src/server/services/DrizzleService/DrizzleService';
import {createSelectSchema} from 'drizzle-zod';
import {OpenApiError} from 'src/server/services/OpenApiService/types/errors/OpenApiError';
import {OpenApiErrorCode} from 'src/server/services/OpenApiService/enums/OpenApiErrorCode';
import {OpenApiMethods} from 'src/server/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/types/AppOpenApiRouteTypes';

export const getExercise = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: AppOpenApiRouteTypes.User,
  description: 'Returns data on exercises available to the user',
  path: '/{id}',
  validators: {
    path: z.object({
      id: z.number(),
    }),
    response: z.object({
      item: createSelectSchema(dbSchema.exercises),
    }),
  },
  handler: async (ctx) => {
    const service = new DrizzleService();
    const db = await service.getDb();
    const result = await db.query.exercises.findFirst({
      where: (table, {eq, not, and, or, isNull}) =>
        and(
          eq(table.id, ctx.params.path.id),
          not(
            eq(table.equipmentId, 13)
          ),
          or(
            isNull(table.userId),
            eq(table.userId, ctx.viewer.id)
          )
        ),
      orderBy: (table, {asc}) => asc(table.name),
    });
    if (!result) {
      throw new OpenApiError(OpenApiErrorCode.notFound);
    }
    return {
      item: result,
    };
  },
});

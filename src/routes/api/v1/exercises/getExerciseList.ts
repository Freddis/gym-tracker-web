import {z} from 'zod';
import {openApiInstance} from '../../../../openApiInstance';
import {EntryType} from 'src/server/model/Entry/types/EntryType';
import {dbSchema} from 'src/server/drizzle/db';
import {DrizzleService} from 'src/server/services/DrizzleService/DrizzleService';
import {createSelectSchema} from 'drizzle-zod';
import {OpenApiMethods} from 'src/server/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/types/AppOpenApiRouteTypes';

export const getExerciseList = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: AppOpenApiRouteTypes.User,
  description: 'Returns data on exercises available to the user',
  path: '/',
  validators: {
    query: z.object({
      page: z.number().optional().default(1),
      type: z.nativeEnum(EntryType).optional(),
    }),
    response: z.object({
      items: createSelectSchema(dbSchema.exercises).array(),
    }),
  },
  handler: async (ctx) => {
    const service = new DrizzleService();
    const db = await service.getDb();
    const result = await db.query.exercises.findMany({
      where: (table, op) => op.and(
                              op.not(op.eq(table.equipmentId, 13)),
                              op.or(
                                op.isNull(table.userId),
                                op.eq(table.userId, ctx.viewer.id)
                              )
                            ),
      orderBy: (table, {asc}) => asc(table.name),
    });
    return {
      items: result,
    };
  },
});

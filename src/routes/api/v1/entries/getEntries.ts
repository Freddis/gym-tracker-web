import {entryValidator} from 'src/backend/model/Entry/Entry';
import {EntryType} from 'src/backend/model/Entry/types/EntryType';
import {openApiInstance} from 'src/backend/utils/openApiInstance';
import {z} from 'zod';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';

export const getEntries = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: AppOpenApiRouteTypes.Public,
  description: 'Returns data on all entries from Argus',
  path: '/',
  validators: {
    query: z.object({
      page: z.number().optional().default(1),
      type: z.nativeEnum(EntryType).optional(),
    }),
    response: openApiInstance.validators.paginatedResponse(entryValidator),
  },
  handler: async (ctx) => {
    const response = await ctx.services.models.entry.getLatest({
      type: ctx.params.query.type,
      page: ctx.params.query.page,
    });
    return response;
  },
});

import {z} from 'zod';
import {openApiInstance} from '../../../server/open-api/openApiInstance';
import {entryValidator} from 'src/server/model/Entry/Entry';
import {EntryType} from 'src/server/model/Entry/types/EntryType';

export const entries = openApiInstance.createPublicRoute({
  method: 'GET',
  description: 'Returns data on all entries from Argus',
  path: '/entries',
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

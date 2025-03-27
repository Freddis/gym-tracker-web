import {z} from 'zod';
import {openApiInstance} from '../../../server/open-api/openApiInstance';
import {EntryType} from 'src/server/model/Entry/types/EntryType';

export const types = openApiInstance.createPublicRoute({
  method: 'GET',
  description: 'Returns possible entry types for Argus',
  path: '/entryTypes',
  validators: {
    response: z.object({
      items: z.nativeEnum(EntryType).array(),
    }),
  },
  handler: async (ctx) => {
    const values = ctx.services.models.entry.getCategories();
    return {items: values};
  },
});

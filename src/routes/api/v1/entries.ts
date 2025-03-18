import {z} from 'zod';
import {openApiInstance} from '../../../server/open-api/openApiInstance';
import {entryValidator} from 'src/server/model/Entry/Entry';

export const entries = openApiInstance.createPublicRoute({
  method: 'GET',
  description: 'Returns data on all entries from Argus',
  path: '/entries',
  validators: {
    response: z.object({
      items: entryValidator.array(),
    }),
  },
  handler: async (ctx) => {
    const values = await ctx.services.models.entry.getLatest({limit: 15});
    return {items: values};
  },
});

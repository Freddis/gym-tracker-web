import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {EntryType} from 'src/backend/model/Entry/types/EntryType';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';

export const getEntryTypes = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: AppOpenApiRouteTypes.User,
  description: 'Returns possible entry types for Argus',
  path: '/types',
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

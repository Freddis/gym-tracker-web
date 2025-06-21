import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ArgusCheckinType} from 'src/backend/model/ArgusCheckin/types/ArgusCheckinType';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {OpenApiMethods} from 'strap-on-openapi';

export const getArgusCheckinTypes = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: ApiRouteTypes.User,
  description: 'Returns possible checkin types for Argus',
  path: '/checkin/types',
  validators: {
    response: z.object({
      items: z.nativeEnum(ArgusCheckinType).array(),
    }),
  },
  handler: async (ctx) => {
    const values = ctx.services.models.argusCheckin.getCategories();
    return {items: values};
  },
});

import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ArgusCheckinType} from 'src/backend/model/ArgusCheckin/types/ArgusCheckinType';
import {OpenApiMethods} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';

export const getArgusCheckinTypes = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: ApiRouteType.User,
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

import {z} from 'zod';
import {ArgusCheckinType} from 'src/backend/model/ArgusCheckin/types/ArgusCheckinType';
import {OpenApiMethods} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {openApiInstance} from '../../../utils/openApiInstance';


export const getArgusCheckinTypes = openApiInstance.factory.createRoute({
  method: OpenApiMethods.GET,
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

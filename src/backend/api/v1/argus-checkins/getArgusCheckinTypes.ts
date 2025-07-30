import {z} from 'zod';
import {ArgusCheckinType} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
import {OpenApiMethod} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {openApi} from '../../../utils/openApi';


export const getArgusCheckinTypes = openApi.factory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns possible checkin types for Argus',
  path: '/checkin/types',
  validators: {
    response: z.object({
      items: z.nativeEnum(ArgusCheckinType).openapi({ref: 'ArgusCheckinType'}).array(),
    }),
  },
  handler: async (ctx) => {
    const values = ctx.services.models.argusCheckin.getCategories();
    return {items: values};
  },
});

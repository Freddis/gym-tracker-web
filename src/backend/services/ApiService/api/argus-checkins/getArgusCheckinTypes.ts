import {z} from 'zod';
import {ArgusCheckinType} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
import {OpenApiMethod} from 'strap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';

export const getArgusCheckinTypes = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Public,
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

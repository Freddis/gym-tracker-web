import {argusCheckinValidator} from 'src/backend/model/ArgusCheckin/ArgusCheckin';
import {ArgusCheckinType} from 'src/backend/model/ArgusCheckin/types/ArgusCheckinType';
import {openApiInstance} from 'src/backend/utils/openApiInstance';
import {z} from 'zod';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {OpenApiMethods} from 'strap-on-openapi';

export const getArgusCheckins = openApiInstance.factory.createRoute({
  method: OpenApiMethods.get,
  type: ApiRouteTypes.Public,
  description: 'Returns data on all checkins from Argus',
  path: '/checkin',
  validators: {
    query: z.object({
      page: z.number().optional().default(1),
      type: z.nativeEnum(ArgusCheckinType).optional(),
    }),
    response: openApiInstance.validators.paginatedResponse(argusCheckinValidator),
  },
  handler: async (ctx) => {
    const response = await ctx.services.models.argusCheckin.getLatest({
      type: ctx.params.query.type,
      page: ctx.params.query.page,
    });
    return response;
  },
});

 import {ArgusCheckinType} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
 import {openApi} from 'src/backend/utils/openApi';
 import {z} from 'zod';
 import {ApiRouteType} from 'src/common/types/ApiRouteType';
 import {OpenApiMethod} from 'strap-on-openapi';
 import {argusCheckinValidator} from '../../../services/ArgusCheckinService/types/ArgusCheckin';


 export const getArgusCheckins = openApi.factory.createRoute({
   method: OpenApiMethod.GET,
   type: ApiRouteType.Public,
   description: 'Returns data on all checkins from Argus',
   path: '/checkin',
   validators: {
     query: z.object({
       page: openApi.validators.strings.number.optional().default('1'),
       type: z.nativeEnum(ArgusCheckinType).optional(),
     }),
     response: openApi.validators.paginatedResponse(argusCheckinValidator),
   },
   handler: async (ctx) => {
     const response = await ctx.services.models.argusCheckin.getLatest({
       type: ctx.params.query.type,
       page: ctx.params.query.page,
     });
     return response;
   },
 });

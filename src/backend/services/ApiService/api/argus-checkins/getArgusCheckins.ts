 import {ArgusCheckinType} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/types/ArgusCheckinType';
 import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
 import {OpenApiMethod} from 'strap-on-openapi';
 import {argusCheckinValidator} from '../../../ArgusCheckinService/types/ArgusCheckin';
 import {nativeEnum, object} from 'zod';
 import {RouteFactory} from '../../utils/RouteFactory';

 export const getArgusCheckins = RouteFactory.createRoute({
   method: OpenApiMethod.GET,
   type: ApiRouteType.Public,
   description: 'Returns data on all checkins from Argus',
   path: '/checkin',
   validators: {
     query: object({
       page: RouteFactory.validators.strings.number.optional().default('1'),
       type: nativeEnum(ArgusCheckinType).optional(),
     }),
     response: RouteFactory.validators.paginatedResponse(argusCheckinValidator),
   },
   handler: async (ctx) => {
     const response = await ctx.services.models.argusCheckin.getLatest({
       type: ctx.params.query.type,
       page: ctx.params.query.page,
     });
     return response;
   },
 });

import {OpenApiMethod} from 'strap-on-openapi';
import {object} from 'zod';
import {ApiRouteType} from '../../../types/ApiRouteType';
import {RouteFactory} from '../../../utils/RouteFactory';
import {managerValidator} from './validators/managerValdator';


export const getManagerList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Manager,
  description: 'Returns list of managers',
  path: '/',
  validators: {
    query: object({
      page: RouteFactory.validators.strings.number.optional().default('1').openapi({
        description: 'Page',
      }),
    }),
    response: RouteFactory.validators.paginatedResponse(managerValidator).openapi({
      description: 'List of Managers',
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.manager.getAll({
      ...ctx.params.query,
      perPage: 10,
    });
    return result;
  },
});

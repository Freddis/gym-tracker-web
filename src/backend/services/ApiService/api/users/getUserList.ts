import {OpenApiMethod} from 'strap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {ApiRouteType} from '../../types/ApiRouteType';
import {object} from 'zod';
import {userValidator} from './validators/userValidator';

export const getUserList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Manager,
  description: 'Returns list of users',
  path: '/',
  validators: {
    query: object({
      page: RouteFactory.validators.strings.number.optional().default('1').openapi({
        description: 'Page',
      }),
    }),
    response: RouteFactory.validators.paginatedResponse(userValidator).openapi({
      description: 'List of users',
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.user.getAll({
      ...ctx.params.query,
      perPage: 10,
    });
    return result;
  },
});

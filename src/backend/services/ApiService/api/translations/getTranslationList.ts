import {OpenApiMethod} from 'snap-on-openapi';
import {object} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {translationValidator} from './validator/translationValidator';

export const getTranslationList = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Manager,
  description: 'Returns list of translations',
  path: '/',
  validators: {
    query: object({
      page: RouteFactory.validators.strings.number.optional().default('1').openapi({
        description: 'Page',
      }),
    }),
    response: RouteFactory.validators.paginatedResponse(translationValidator).openapi({
      description: 'List of translations',
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.translation.paginate({
      ...ctx.params.query,
      perPage: 10,
    });
    return result;
  },
});

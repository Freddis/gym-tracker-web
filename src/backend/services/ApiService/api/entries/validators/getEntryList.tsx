import {OpenApiMethod} from 'strap-on-openapi';
import {ApiRouteType} from '../../../types/ApiRouteType';
import {RouteFactory} from '../../../utils/RouteFactory';
import {PaginatedResult} from '../../../types/PaginatedResponse';
import {Entry} from '../../../../EntryService/types/Entry';
import {entryValidator} from './entryValidator';
import {object} from 'zod';

export const getEntryList = RouteFactory.createRoute({
  type: ApiRouteType.Public,
  method: OpenApiMethod.GET,
  path: '/',
  description: 'Returns the list of public entries',
  validators: {
    query: object({
      page: RouteFactory.validators.strings.number.optional(),
    }),
    response: RouteFactory.validators.paginatedResponse(entryValidator),
  },
  handler: async (ctx): Promise<PaginatedResult<Entry>> => {
    const result = await ctx.services.models.entry.getAll(ctx.params.query);
    return result;
  },
});

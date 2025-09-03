import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {PaginatedResult} from '../../types/PaginatedResult';
import {Entry} from '../../../EntryService/types/Entry';
import {entryValidator} from './validators/entryValidator';
import {getEntryListQueryValidator} from './validators/getEntriesQueryValidator';

export const getEntryList = RouteFactory.createRoute({
  type: ApiRouteType.Public,
  method: OpenApiMethod.GET,
  path: '/',
  description: 'Returns the list of public entries',
  validators: {
    query: getEntryListQueryValidator,
    response: RouteFactory.validators.paginatedResponse(entryValidator).openapi({
      description: 'List of entries',
    }),
  },
  handler: async (ctx): Promise<PaginatedResult<Entry>> => {
    const result = await ctx.services.models.entry.getAll(ctx.params.query);
    return result;
  },
});

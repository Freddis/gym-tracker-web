import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {PaginatedResult} from '../../types/PaginatedResult';
import {getEntryListQueryValidator} from './validators/getEntriesQueryValidator';
import {feedEntryValidator} from './validators/feedEntryValidator';
import {FeedEntry} from '../../../FeedEntryService/types/FeedEntry';

export const getEntryList = RouteFactory.createRoute({
  type: ApiRouteType.Public,
  method: OpenApiMethod.GET,
  path: '/',
  description: 'Returns the list of public entries',
  validators: {
    query: getEntryListQueryValidator,
    response: RouteFactory.validators.paginatedResponse(feedEntryValidator).openapi({
      description: 'List of entries',
    }),
  },
  handler: async (ctx): Promise<PaginatedResult<FeedEntry>> => {
    const result = await ctx.services.models.feedEntry.paginateForUser({
      ...ctx.params.query,
      language: ctx.language,
      perPage: 10,
    });
    return result;
  },
});

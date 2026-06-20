import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {PaginatedResult} from '../../types/PaginatedResult';
import {getEntryListQueryValidator} from './validators/getEntriesQueryValidator';
import {feedEntryValidator} from './validators/feedEntryValidator';
import {FeedEntry} from '../../../FeedEntryService/types/FeedEntry';
import {ApiError} from '../../errors/ApiError';
import {ApiErrorCode} from '../../types/ApiErrorCode';

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
    const userId = ctx.params.query.own ? ctx.viewer?.id : undefined;
    if (ctx.params.query.own && !ctx.viewer) {
      throw new ApiError(ApiErrorCode.Unauthorized);
    }
    const result = await ctx.services.models.feedEntry.paginateForUser({
      ...ctx.params.query,
      userId: userId ? [userId] : undefined,
      language: ctx.language,
      perPage: 10,
    });
    return result;
  },
});

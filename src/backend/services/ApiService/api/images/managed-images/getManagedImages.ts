import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../../utils/RouteFactory';
import {crmPaginatedQuery} from '../../../validators/crmPaginatedQuery';
import {imageValidator} from '../validators/imageValidator';

export const getManagedImages = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Manager,
  description: 'Returns data on images',
  path: '/',
  validators: {
    query: crmPaginatedQuery,
    response: RouteFactory.validators.paginatedResponse(imageValidator).openapi({description: 'List of images'}),
  },
  handler: async (ctx) => {
    const result = await ctx.services.image.paginate(ctx.params.query);
    return result;
  },
});

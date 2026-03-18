import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {object} from 'zod';
import {RouteFactory} from '../../utils/RouteFactory';

export const deleteEntry = RouteFactory.createRoute({
  method: OpenApiMethod.DELETE,
  type: ApiRouteType.User,
  description: 'Deletes entry for user',
  path: '/{id}',
  validators: {
    path: object({
      id: RouteFactory.validators.strings.number.openapi({description: 'Id of the entry'}),
    }),
    response: object({}).openapi({description: 'Empty response on success'}),
  },
  handler: async (ctx) => {
    await ctx.services.models.entry.delete(ctx.viewer.id, ctx.params.path.id);
    return {};
  },
});

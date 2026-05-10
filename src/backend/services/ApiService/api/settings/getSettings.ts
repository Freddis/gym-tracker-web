import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {settingsValidator} from './validators/settingsValidator';
import {RouteTag} from '../../types/RouteTag';

export const getSettings = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.User,
  description: 'Returns data on user settings & profile',
  path: '/',
  operationId: 'getSettings',
  tags: [RouteTag.Settings],
  validators: {
    response: settingsValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.settings.getForUser(ctx.viewer);
    return result;
  },
});

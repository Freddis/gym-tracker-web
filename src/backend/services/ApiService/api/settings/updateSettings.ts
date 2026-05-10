import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {settingsValidator} from './validators/settingsValidator';
import {RouteTag} from '../../types/RouteTag';
import {settingsUpdateDtoValidator} from './validators/settingsUpdateDtoValidator';

export const updateSettings = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Updates user settings & profile',
  path: '/',
  operationId: 'updateSettings',
  tags: [RouteTag.Settings],
  validators: {
    body: settingsUpdateDtoValidator,
    response: settingsValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.settings.update(ctx.viewer, ctx.params.body);
    return result;
  },
});

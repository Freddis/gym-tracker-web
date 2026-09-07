import {object} from 'zod';
import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {RouteTag} from '../../types/RouteTag';
import {emptyOperationResponse} from '../../validators/emptyOperationResponse';
import {scriptTypeValidator} from './validators/scriptTypeValidator';

export const runScript = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Manager,
  description: 'Runs a backoffice script',
  path: '/run',
  tags: [RouteTag.CrmScripts],
  validators: {
    body: object({
      type: scriptTypeValidator,
    }),
    response: emptyOperationResponse,
  },
  handler: async (ctx) => {
    const success = await ctx.services.models.script.run(ctx.params.body.type);
    return {success};
  },
});

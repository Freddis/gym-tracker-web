import {object} from 'zod';
import {OpenApiMethod} from 'snap-on-openapi';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';
import {RouteTag} from '../../types/RouteTag';
import {scriptInfoValidator} from './validators/scriptInfoValidator';

export const getScripts = RouteFactory.createRoute({
  method: OpenApiMethod.GET,
  type: ApiRouteType.Manager,
  description: 'Returns available backoffice scripts',
  path: '/',
  tags: [RouteTag.CrmScripts],
  validators: {
    response: object({
      items: scriptInfoValidator.array().openapi({description: 'Available scripts'}),
    }).openapi({description: 'List of scripts'}),
  },
  handler: async (ctx) => {
    const items = ctx.services.models.script.getScripts();
    return {items};
  },
});

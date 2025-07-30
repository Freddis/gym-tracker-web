import {OpenApiMethod} from 'strap-on-openapi';
import {weightValidator} from './validators/weightValidator';
import {number, object} from 'zod';
import {ApiRouteType} from '../../types/ApiRouteType';
import {RouteFactory} from '../../utils/RouteFactory';

export const createWeight = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Adds new weight entry for the user',
  path: '/',
  validators: {
    body: object({
      weight: number(),
    }),
    response: weightValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.weight.create(ctx.viewer, ctx.params.body.weight);
    return result;
  },
});

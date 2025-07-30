import {OpenApiMethod} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {openApi} from '../../../utils/openApi';
import {weightValidator} from './validators/weightValidator';
import {number, object} from 'zod';

export const createWeight = openApi.factory.createRoute({
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

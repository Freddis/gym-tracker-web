import {z} from 'zod';
import {OpenApiMethods} from 'strap-on-openapi';
import {ApiRouteType} from '../../../../common/types/ApiRouteType';
import {weightValidator} from '../../../model/Weight/Weight';
import {openApiInstance} from '../../../utils/openApiInstance';


export const createWeight = openApiInstance.factory.createRoute({
  method: OpenApiMethods.POST,
  type: ApiRouteType.User,
  description: 'Adds new weight entry for the user',
  path: '/',
  validators: {
    body: z.object({
      weight: z.number(),
    }),
    response: weightValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.models.weight.create(ctx.viewer, ctx.params.body.weight);
    return result;
  },
});

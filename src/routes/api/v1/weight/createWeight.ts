import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteTypes} from 'src/common/types/ApiRouteTypes';
import {weightValidator} from '../../../../backend/model/Weight/Weight';
import {OpenApiMethods} from 'strap-on-openapi';

export const createWeight = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: ApiRouteTypes.User,
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

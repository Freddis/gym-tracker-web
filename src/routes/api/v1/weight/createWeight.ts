import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';
import {weightValidator} from '../../../../backend/model/Weight/Weight';

export const createWeight = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: AppOpenApiRouteTypes.User,
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

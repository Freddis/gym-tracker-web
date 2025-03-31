import {z} from 'zod';
import {openApiInstance} from '../../../../openApiInstance';
import {OpenApiMethods} from 'src/server/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/types/AppOpenApiRouteTypes';

export const registerUser = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: AppOpenApiRouteTypes.Public,
  description: 'Registers a user',
  path: '/register',
  validators: {
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(5),
      passwordConfirmation: z.string(),
    }),
    response: z.object({
      id: z.number(),
      email: z.string(),
      name: z.string(),
      jwt: z.string(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.auth.register(ctx.params.body);
    return result;
  },
});

import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {OpenApiMethods} from 'src/backend/services/OpenApiService/enums/OpenApiMethods';
import {AppOpenApiRouteTypes} from 'src/common/types/AppOpenApiRouteTypes';

export const loginUser = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: AppOpenApiRouteTypes.Public,
  description: 'Logins a user',
  path: '/login',
  validators: {
    body: z.object({
      email: z.string().email(),
      password: z.string().min(5),
    }),
    response: z.object({
      id: z.number(),
      email: z.string(),
      name: z.string(),
      jwt: z.string(),
    }),
  },
  handler: async (ctx) => {
    console.log(ctx);
    const result = await ctx.services.auth.login(ctx.params.body.email, ctx.params.body.password);
    return result;
  },
});

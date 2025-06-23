import {z} from 'zod';
import {openApiInstance} from '../../../../backend/utils/openApiInstance';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethods} from 'strap-on-openapi';

export const loginUser = openApiInstance.factory.createRoute({
  method: OpenApiMethods.post,
  type: ApiRouteType.Public,
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
    const result = await ctx.services.auth.login(ctx.params.body.email, ctx.params.body.password);
    return result;
  },
});

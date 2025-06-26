import {z} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethods} from 'strap-on-openapi';
import {openApiInstance} from '../../../utils/openApiInstance';

export const registerUser = openApiInstance.factory.createRoute({
  method: OpenApiMethods.POST,
  type: ApiRouteType.Public,
  description: 'Registers a user',
  path: '/register',
  validators: {
    body: z.object({
      name: z.string().nonempty(),
      email: z.string().email(),
      password: z.string().min(5),
      passwordConfirmation: z.string().nonempty(),
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

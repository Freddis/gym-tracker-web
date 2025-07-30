import {number, object, string} from 'zod';
import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';

export const registerUser = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Public,
  description: 'Registers a user',
  path: '/register',
  validators: {
    body: object({
      name: string().nonempty(),
      email: string().email(),
      password: string().min(5),
      passwordConfirmation: string().nonempty(),
    }),
    response: object({
      id: number(),
      email: string(),
      name: string(),
      jwt: string(),
    }),
  },
  handler: async (ctx) => {
    const result = await ctx.services.auth.register(ctx.params.body);
    return result;
  },
});

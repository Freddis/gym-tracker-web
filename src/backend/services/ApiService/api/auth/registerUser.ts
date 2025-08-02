import {object, string} from 'zod';
import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'strap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {authUserValidator} from './validators/authUserValidator';

export const registerUser = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Public,
  description: 'Registers a user',
  path: '/register',
  validators: {
    body: object({
      name: string().nonempty().openapi({description: 'Name of the user. Displayed in the app.'}),
      email: string().email().openapi({description: 'Email of the user. Stays hidden on public pages.'}),
      password: string().min(5).openapi({description: 'Password'}),
      passwordConfirmation: string().nonempty().openapi({description: 'Confirmation of password. Protection from typos'}),
    }),
    response: authUserValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.auth.register(ctx.params.body);
    return result;
  },
});

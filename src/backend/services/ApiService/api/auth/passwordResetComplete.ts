import {object, string} from 'zod';
import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {authUserValidator} from './validators/authUserValidator';
import {RouteTag} from '../../types/RouteTag';

export const passwordResetComplete = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Public,
  description: 'Resets the user password and logs the user in',
  path: '/password-reset-complete',
  operationId: 'finishPasswordReset',
  tags: [RouteTag.Auth],
  validators: {
    body: object({
      token: string().openapi({description: 'Token provided in the password reset email'}),
      password: string().min(5).openapi({description: 'Password'}),
      passwordConfirmation: string().nonempty().openapi({description: 'Confirmation of password. Protection from typos'}),
    }),
    response: authUserValidator,
  },
  handler: async (ctx) => {
    const result = await ctx.services.auth.resetPassword(
      ctx.params.body.token,
      ctx.params.body.password,
      ctx.params.body.passwordConfirmation,
    );
    return result;
  },
});

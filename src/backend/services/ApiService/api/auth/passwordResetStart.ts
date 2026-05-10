import {object, string} from 'zod';
import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {emptyOperationResponse} from '../../validators/emptyOperationResponse';
import {RouteTag} from '../../types/RouteTag';

export const passwordResetStart = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Public,
  description: 'Sends a password reset email for a user',
  path: '/password-reset',
  operationId: 'startPasswordReset',
  tags: [RouteTag.Auth],
  validators: {
    body: object({
      email: string().email().openapi({description: 'Email of the user'}),
    }),
    response: emptyOperationResponse,
  },
  handler: async (ctx) => {
    await ctx.services.auth.sendPasswordResetEmail(
      ctx.params.body.email,
      `${ctx.baseUrl}/auth/password-reset-complete`,
    );
    return {success: true};
  },
});

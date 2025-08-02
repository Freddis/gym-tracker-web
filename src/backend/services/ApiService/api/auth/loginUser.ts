import {object, string, ZodError} from 'zod';
import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod, OpenApiValidationError, OpenApiValidationLocation} from 'strap-on-openapi';
import {ActionError} from '../../errors/ActionError';
import {ActionErrorCode} from '../../types/ActionErrorCode';
import {RouteFactory} from '../../utils/RouteFactory';
import {authUserValidator} from './validators/authUserValidator';

export const loginUser = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Public,
  description: 'Logins a user',
  path: '/login',
  validators: {
    body: object({
      email: string().email().openapi({description: 'Email for the user account'}),
      password: string()
        .min(5, 'Password must be at least 5 characters long')
        .openapi({description: 'Password for the user account'}),
    }),
    response: authUserValidator,
  },
  handler: async (ctx) => {
    try {
      const result = await ctx.services.auth.login(ctx.params.body.email, ctx.params.body.password);
      return result;
    } catch (error) {
      if (error instanceof ActionError && error.getActionErrorCode() === ActionErrorCode.InvalidPassword) {
        const zodError = ZodError.create([]);
        zodError.addIssue({
          code: 'custom',
          path: ['password'],
          message: 'Incorrect email or password',
        });
        throw new OpenApiValidationError(zodError, OpenApiValidationLocation.Body);
      }
      throw error;
    }
  },
});

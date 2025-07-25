import {z, ZodError} from 'zod';
import {ApiRouteType} from 'src/common/types/ApiRouteType';
import {OpenApiMethod, OpenApiValidationError, OpenApiValidationLocation} from 'strap-on-openapi';
import {openApi} from '../../../utils/openApi';
import {ActionError} from '../../../services/ApiService/errors/ActionError';
import {ActionErrorCode} from '../../../services/ApiService/types/ActionErrorCode';

export const loginUser = openApi.factory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Public,
  description: 'Logins a user',
  path: '/login',
  validators: {
    body: z.object({
      email: z.string().email(),
      password: z.string().min(5, 'Password must be at least 5 characters long'),
    }),
    response: z.object({
      id: z.number(),
      email: z.string(),
      name: z.string(),
      jwt: z.string(),
    }),
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

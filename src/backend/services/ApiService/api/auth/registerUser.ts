import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {RouteFactory} from '../../utils/RouteFactory';
import {authUserValidator} from './validators/authUserValidator';
import {registrationRequestValidator} from './validators/registrationRequestValidator';
import {ActionError} from '../../errors/ActionError';
import {ActionErrorCode} from '../../types/ActionErrorCode';
import {QuickTranslatedValidationError} from '../../errors/QuickTranslatedValidationError';
import {ValidationErrorCode} from '../../types/ValidationErrorCode';

export const registerUser = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Public,
  description: 'Registers a user',
  path: '/register',
  operationId: 'register',
  validators: {
    body: registrationRequestValidator,
    response: authUserValidator,
  },
  handler: async (ctx) => {
    try {
      const routeUrl = `${ctx.baseUrl}/auth/confirm-email`;
      const result = await ctx.services.auth.register(ctx.params.body, routeUrl);
      return result;
    } catch (error) {
      if (error instanceof ActionError) {
        const code = error.getActionErrorCode();
        if (code === ActionErrorCode.InvalidPassword) {
          throw new QuickTranslatedValidationError(
            registrationRequestValidator,
            'passwordConfirmation',
            ValidationErrorCode.PasswordConfirmationMismatch
          );
        }
      }
      throw error;
    }
  },
});

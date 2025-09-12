import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {ActionError} from '../../errors/ActionError';
import {ActionErrorCode} from '../../types/ActionErrorCode';
import {RouteFactory} from '../../utils/RouteFactory';
import {authUserValidator} from './validators/authUserValidator';
import {ValidationErrorCode} from '../../types/ValidationErrorCode';
import {QuickTranslatedValidationError} from '../../errors/QuickTranslatedValidationError';
import {loginRequestValidator} from './validators/loginRequestValidator';

export const loginUser = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.Public,
  description: 'Logins a user',
  path: '/login',
  validators: {
    body: loginRequestValidator,
    response: authUserValidator,
  },
  handler: async (ctx) => {
    try {
      const result = await ctx.services.auth.login(ctx.params.body.email, ctx.params.body.password);
      return result;
    } catch (error) {
      if (error instanceof ActionError && error.getActionErrorCode() === ActionErrorCode.InvalidPassword) {
        throw new QuickTranslatedValidationError(loginRequestValidator, 'password', ValidationErrorCode.IncorrectEmailOrPassword);
      }
      throw error;
    }
  },
});

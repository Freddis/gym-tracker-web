import {ApiRouteType} from 'src/backend/services/ApiService/types/ApiRouteType';
import {OpenApiMethod} from 'snap-on-openapi';
import {ActionError} from '../../errors/ActionError';
import {ActionErrorCode} from '../../types/ActionErrorCode';
import {RouteFactory} from '../../utils/RouteFactory';
import {authUserValidator} from './validators/authUserValidator';
import {ValidationErrorCode} from '../../types/ValidationErrorCode';
import {QuickTranslatedValidationError} from '../../errors/QuickTranslatedValidationError';
import {RouteTag} from '../../types/RouteTag';
import {changePasswordRequestValidator} from './validators/changePasswordRequestValidator';

export const changePassword = RouteFactory.createRoute({
  method: OpenApiMethod.POST,
  type: ApiRouteType.User,
  description: 'Changes the password of the user',
  tags: [RouteTag.Auth],
  operationId: 'changePassword',
  path: '/change-password',
  validators: {
    body: changePasswordRequestValidator,
    response: authUserValidator,
  },
  handler: async (ctx) => {
    try {
      const result = await ctx.services.auth.changePassword(
        ctx.viewer.id,
        ctx.params.body.oldPassword,
        ctx.params.body.newPassword,
        ctx.params.body.confirmation
      );
      return result;
    } catch (error) {
      if (error instanceof ActionError) {
        const code = error.getActionErrorCode();
        if (code === ActionErrorCode.InvalidPassword) {
          throw new QuickTranslatedValidationError(
            changePasswordRequestValidator,
            'oldPassword',
            ValidationErrorCode.IncorrectEmailOrPassword
          );
        }
        if (code === ActionErrorCode.PasswordConfirmationMismatch) {
          throw new QuickTranslatedValidationError(
            changePasswordRequestValidator,
            'confirmation',
             ValidationErrorCode.PasswordConfirmationMismatch
          );
        }
      }
      throw error;
    }
  },
});

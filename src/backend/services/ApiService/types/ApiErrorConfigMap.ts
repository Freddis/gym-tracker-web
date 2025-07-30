import {OpenApiErrorConfigMap} from 'strap-on-openapi';
import {ApiErrorCode} from './ApiErrorCode';
import {permissionErrorResponseValidator} from '../validators/PermissionErrorResponse';
import {actionErrorResponseValidator} from '../validators/ActionErrorResponse';
import {unknownErrorResponseValidator} from '../validators/UnknownErrorResponse';
import {validationErrorResponseValidator} from '../validators/ValidationErrorResponse';
import {responseValidationErrorResponseValidator} from '../validators/ReponseValidationErrorResponse';
import {unauthorizedErrorResponseValidator} from '../validators/UnauthorizedErrorResponse';

export class ApiErrorConfigMap implements OpenApiErrorConfigMap<ApiErrorCode> {
  [ApiErrorCode.MissingPermission] = {
    status: '403',
    description: 'Missing Permission',
    responseValidator: permissionErrorResponseValidator,
  } as const;
  [ApiErrorCode.UnknownError] = {
    status: '500' as const,
    description: 'Unknown Error',
    responseValidator: unknownErrorResponseValidator,
  } as const;
  [ApiErrorCode.ValidationFailed] = {
    status: '400' as const,
    description: 'Validation Failed',
    responseValidator: validationErrorResponseValidator,
  } as const;
  [ApiErrorCode.ActionError] = {
    status: '400' as const,
    description: 'Action Error',
    responseValidator: actionErrorResponseValidator,
  } as const;
  [ApiErrorCode.Unauthorized] = {
    status: '401' as const,
    description: 'Unauthorized',
    responseValidator: unauthorizedErrorResponseValidator,
  } as const;
  [ApiErrorCode.ResponseValidationFailed] = {
    status: '422' as const,
    description: 'Validation Error on Response. Always server-side problem. Introduced for debugging purposes, disabled in prod.',
    responseValidator: responseValidationErrorResponseValidator,
  };
}

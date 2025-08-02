import {
  OpenApiAnyConfig,
  OpenApiErrorConfigMap,
  OpenApiErrorResponse,
  OpenApiFieldError,
  OpenApiValidationError,
  OpenApiValidationLocation,
} from 'strap-on-openapi';
import {ApiRouteType} from './ApiRouteType';
import {ApiErrorCode} from './ApiErrorCode';
import {ApiRouteConfig} from './ApiRouteConfig';
import {ApiErrorConfigMap} from './ApiErrorConfigMap';
import {DrizzleService} from '../../DrizzleService/DrizzleService';
import {PermissionError} from '../errors/PermissionError';
import {ApiError} from '../errors/ApiError';
import {PermissionErrorResponse} from '../validators/PermissionErrorResponse';
import {ResponseValidationErrorResponse} from '../validators/ReponseValidationErrorResponse';
import {UnauthorizedErrorResponse} from '../validators/UnauthorizedErrorResponse';
import {UnknownErrorResponse} from '../validators/UnknownErrorResponse';
import {ValidationErrorResponse} from '../validators/ValidationErrorResponse';

export class ApiConfig implements OpenApiAnyConfig<ApiRouteType, ApiErrorCode> {
  basePath = '/api' as const;
  routes: ApiRouteConfig;
  errors = new ApiErrorConfigMap();
  defaultError = {
    code: ApiErrorCode.UnknownError,
    body: {
      error: ApiErrorCode.UnknownError,
    },
  } as const;
  // skipDescriptionsCheck?: boolean = true;

  constructor(service: DrizzleService) {
    this.routes = new ApiRouteConfig(service);
  }

  handleError(e: unknown): OpenApiErrorResponse<ApiErrorCode, OpenApiErrorConfigMap<ApiErrorCode>> {
    if (e instanceof PermissionError) {
      const permissionError: PermissionErrorResponse = {
        error: {
          code: ApiErrorCode.MissingPermission,
          requiredPermissions: e.getRequiredPermissions(),
        },
      };
      return {code: ApiErrorCode.MissingPermission, body: permissionError};
    }

    if (e instanceof OpenApiValidationError) {
      const zodError = e.getZodError();
      const map: OpenApiFieldError[] = [];
      for (const issue of zodError.issues) {
        map.push({
          field: issue.path.map((x) => x.toString()).join('.'),
          message: issue.message,
        });
      }
      if (e.getLocation() !== OpenApiValidationLocation.Response) {
        const response: ValidationErrorResponse = {
          error: {
            code: ApiErrorCode.ValidationFailed,
            location: e.getLocation(),
            fieldErrors: map,
          },
        };
        return {code: ApiErrorCode.ValidationFailed, body: response};
      }
      const showResponseErrors = true;
      if (showResponseErrors) {
        const response: ResponseValidationErrorResponse = {
          error: {
            code: ApiErrorCode.ResponseValidationFailed,
            location: OpenApiValidationLocation.Response,
            fieldErrors: map,
          },
        };
        return {code: ApiErrorCode.ResponseValidationFailed, body: response};
      }
    }

    if (e instanceof ApiError) {
      if (e.getCode() === ApiErrorCode.Unauthorized) {
        const error: UnauthorizedErrorResponse = {
          error: {
            code: ApiErrorCode.Unauthorized,
          },
        };
        return {code: ApiErrorCode.Unauthorized, body: error};
      }
    }

    const unknownError: UnknownErrorResponse = {
      error: {
        code: ApiErrorCode.UnknownError,
      },
    };
    return {code: ApiErrorCode.UnknownError, body: unknownError};
  }
}

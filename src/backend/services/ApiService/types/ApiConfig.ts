import {
  OpenApiAnyConfig,
  OpenApiErrorConfigMap,
  OpenApiErrorResponse,
  OpenApiFieldError,
  OpenApiValidationError,
  OpenApiValidationLocation,
} from 'snap-on-openapi';
import {ApiRouteType} from './ApiRouteType';
import {ApiErrorCode} from './ApiErrorCode';
import {ApiRouteConfig} from './ApiRouteConfig';
import {ApiErrorConfigMap} from './ApiErrorConfigMap';
import {PermissionError} from '../errors/PermissionError';
import {ApiError} from '../errors/ApiError';
import {PermissionErrorResponse} from '../validators/PermissionErrorResponse';
import {ResponseValidationErrorResponse} from '../validators/ReponseValidationErrorResponse';
import {UnauthorizedErrorResponse} from '../validators/UnauthorizedErrorResponse';
import {UnknownErrorResponse} from '../validators/UnknownErrorResponse';
import {ValidationErrorResponse} from '../validators/ValidationErrorResponse';
import {NotFoundErrorResponse} from '../validators/NotFoundErrorResponse';
import {GlobalServiceFactory} from '../../../utils/GlobalServiceFactory/GlobalServiceFactory';
import {tryToTranslateValidationError} from '../utils/tryToTranslateValidationError';
import {getErrorMap} from 'zod';
import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {translateZodError} from '../utils/translateZodError';
import {zodErrorMessages} from '../utils/zodErrorMessages';
import {ActionError} from '../errors/ActionError';
import {ActionErrorResponse} from '../validators/ActionErrorResponse';
import {ActionErrorCode} from './ActionErrorCode';

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

  constructor(factory: GlobalServiceFactory) {
    this.routes = new ApiRouteConfig(factory);
  }

  handleError(e: unknown, req: Request): OpenApiErrorResponse<ApiErrorCode, OpenApiErrorConfigMap<ApiErrorCode>> {
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
      const lang = this.routes.getRequestLangauge(req);
      for (const issue of zodError.issues) {
        const defaultMessage = getErrorMap()(issue, {
          defaultError: '',
          data: undefined,
        }).message;
        let finalMessage = issue.message;
        if (issue.message === defaultMessage && lang !== Language.English) {
          const dictionary = zodErrorMessages[lang];
          finalMessage = translateZodError(issue, dictionary);
        } else {
          finalMessage = tryToTranslateValidationError(issue.message, lang);
        }
        map.push({
          field: issue.path.map((x) => x.toString()).join('.'),
          message: finalMessage,
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
    if (e instanceof ActionError) {
      const humanReadable = this.getActionErrorDescriptions()[e.getActionErrorCode()];
      const error: ActionErrorResponse = {
        error: {
          code: ApiErrorCode.ActionError,
          actionErrorCode: e.getActionErrorCode(),
          humanReadable,
        },
      };
      return {code: ApiErrorCode.ActionError, body: error};
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
      if (e.getCode() === ApiErrorCode.NotFound) {
        const error: NotFoundErrorResponse = {
          error: {
            code: ApiErrorCode.NotFound,
          },
        };
        return {code: ApiErrorCode.NotFound, body: error};
      }
    }

    const unknownError: UnknownErrorResponse = {
      error: {
        code: ApiErrorCode.UnknownError,
      },
    };
    return {code: ApiErrorCode.UnknownError, body: unknownError};
  }

  protected getActionErrorDescriptions(): Record<ActionErrorCode, string> {
    const result: Record<ActionErrorCode, string> = {
      [ActionErrorCode.InvalidPassword]: 'Invalid password',
      [ActionErrorCode.EmailAlreadyExists]: 'Email already exists',
      [ActionErrorCode.WorkoutNotFound]: 'Workout not found',
      [ActionErrorCode.ExerciseNotFound]: 'Exercise not found',
      [ActionErrorCode.NoOwnerShip]: "You don't have ownership of that object",
    };
    return result;
  }
}

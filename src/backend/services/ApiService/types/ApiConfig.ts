import {
  OpenApiConfig,
  OpenApiErrorResponse,
  OpenApiFieldError,
  OpenApiOnErrorEvent,
  OpenApiOnResponseEvent,
  OpenApiOnRouteEvent,
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
import {ApiRouteParamsMap} from './ApiRouteParamsMap';
import {ApiRouteContextMap} from './ApiRouteContextMap';

export class ApiConfig implements OpenApiConfig<
 ApiRouteType,
 ApiErrorCode,
 ApiErrorConfigMap,
 ApiRouteParamsMap,
 ApiRouteContextMap,
 ApiRouteConfig
> {
  basePath = '/api' as const;
  apiName = 'Discipline API';
  apiVersion = '1.0.0';
  routes: ApiRouteConfig;
  errors = new ApiErrorConfigMap();
  defaultError = {
    code: ApiErrorCode.UnknownError,
    body: {
      error: {
        code: ApiErrorCode.UnknownError,
      },
    },
  } as const;

  constructor(factory: GlobalServiceFactory, baseUrl: string) {
    this.routes = new ApiRouteConfig(factory, baseUrl);
  }

  async onRoute(e: OpenApiOnRouteEvent<ApiRouteType, ApiRouteParamsMap>): Promise<void> {
    e.logger.info(`Calling route ${e.route.path}`);
    e.logger.info(`${e.method}: ${e.request.url}`, {
      path: e.path,
      query: e.query,
      body: e.body,
    });
  }
  onResponse? = async (e: OpenApiOnResponseEvent<ApiRouteType, ApiRouteParamsMap, ApiRouteContextMap>) => {
    e.logger.info(`Response: ${e.response.status}`, {body: e.response.body, headers: e.response.headers});
  };

  async onError(
    e: OpenApiOnErrorEvent<ApiRouteType, ApiRouteParamsMap, ApiRouteContextMap>
  ): Promise<OpenApiErrorResponse<ApiErrorCode, ApiErrorConfigMap>> {
    e.logger.error(`Error: ${e.error}`, e.error, {
      path: e.path,
      query: e.query,
      body: e.body,
    });
    const error = e.error;
    if (error instanceof PermissionError) {
      const permissionError: PermissionErrorResponse = {
        error: {
          code: ApiErrorCode.MissingPermission,
          requiredPermissions: error.getRequiredPermissions(),
        },
      };
      return {code: ApiErrorCode.MissingPermission, body: permissionError};
    }

    if (error instanceof OpenApiValidationError) {
      const zodError = error.getZodError();
      const map: OpenApiFieldError[] = [];
      const lang = this.routes.getRequestLangauge(e.request);
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
      if (error.getLocation() !== OpenApiValidationLocation.Response) {
        const response: ValidationErrorResponse = {
          error: {
            code: ApiErrorCode.ValidationFailed,
            location: error.getLocation(),
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
    if (error instanceof ActionError) {
      const humanReadable = this.getActionErrorDescriptions()[error.getActionErrorCode()];
      const response: ActionErrorResponse = {
        error: {
          code: ApiErrorCode.ActionError,
          actionErrorCode: error.getActionErrorCode(),
          humanReadable,
        },
      };
      return {code: ApiErrorCode.ActionError, body: response};
    }
    if (error instanceof ApiError) {
      if (error.getCode() === ApiErrorCode.Unauthorized) {
        const response: UnauthorizedErrorResponse = {
          error: {
            code: ApiErrorCode.Unauthorized,
          },
        };
        return {code: ApiErrorCode.Unauthorized, body: response};
      }
      if (error.getCode() === ApiErrorCode.NotFound) {
        const response: NotFoundErrorResponse = {
          error: {
            code: ApiErrorCode.NotFound,
          },
        };
        return {code: ApiErrorCode.NotFound, body: response};
      }
    }

    const response: UnknownErrorResponse = {
      error: {
        code: ApiErrorCode.UnknownError,
      },
    };
    return {code: ApiErrorCode.UnknownError, body: response};
  }

  protected getActionErrorDescriptions(): Record<ActionErrorCode, string> {
    const result: Record<ActionErrorCode, string> = {
      [ActionErrorCode.InvalidPassword]: 'Invalid password',
      [ActionErrorCode.EmailAlreadyExists]: 'Email already exists',
      [ActionErrorCode.WorkoutNotFound]: 'Workout not found',
      [ActionErrorCode.ExerciseNotFound]: 'Exercise not found',
      [ActionErrorCode.NoOwnerShip]: "You don't have ownership of that object",
      [ActionErrorCode.PasswordResetTokenExpired]: 'Password reset token expired',
      [ActionErrorCode.PasswordResetTokenMalformed]: 'Password reset token malformed',
    };
    return result;
  }
}

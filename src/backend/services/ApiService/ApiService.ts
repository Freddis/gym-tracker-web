import {
  OpenApiFieldError,
  OpenApi,
  OpenApiValidationError,
  OpenApiValidationLocation,
} from 'strap-on-openapi';
import {ApiRequestServices} from '../../../common/types/ApiRequestServices';
import {ArgusCheckinService} from '../ArgusCheckinService/ArgusCheckinService';
import {AuthService} from '../AuthService/AuthService';
import {ExerciseService} from '../ExerciseService/ExerciseService';
import {WeightService} from '../WeightService/WeightService';
import {WorkoutService} from '../WorkoutService/WorkoutService';
import {serverConfig} from '../../utils/ServerConfig/config';
import {ApiErrorCode} from './types/ApiErrorCode';
import {UnknownErrorResponse, unknownErrorResponseValidator} from './validators/UnknownErrorResponse';
import {PermissionErrorResponse, permissionErrorResponseValidator} from './validators/PermissionErrorResponse';
import {ValidationErrorResponse, validationErrorResponseValidator} from './validators/ValidationErrorResponse';
import {actionErrorResponseValidator} from './validators/ActionErrorResponse';
import {UnauthorizedErrorResponse, unauthorizedErrorResponseValidator} from './validators/UnauthorizedErrorResponse';
import {PermissionError} from './errors/PermissionError';
import {ApiError} from './errors/ApiError';
import {ActionErrorCode} from './types/ActionErrorCode';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {ResponseValidationErrorResponse, responseValidationErrorResponseValidator} from './validators/ReponseValidationErrorResponse';
import {ApiRouteType} from '../../../common/types/ApiRouteType';
export class ApiService {
  protected drizzle: DrizzleService;
  protected spec = OpenApi.builder.customizeErrors(
  ApiErrorCode).defineErrors(
    {
      [ApiErrorCode.MissingPermission]: {
        status: '403',
        description: 'Missing Permission',
        responseValidator: permissionErrorResponseValidator,
      },
      [ApiErrorCode.UnknownError]: {
        status: '500' as const,
        description: 'Unknown Error',
        responseValidator: unknownErrorResponseValidator,
      },
      [ApiErrorCode.ValidationFailed]: {
        status: '400' as const,
        description: 'Validation Failed',
        responseValidator: validationErrorResponseValidator,
      },
      [ApiErrorCode.ActionError]: {
        status: '400' as const,
        description: 'Action Error',
        responseValidator: actionErrorResponseValidator,
      },
      [ApiErrorCode.Unauthorized]: {
        status: '401' as const,
        description: 'Unauthorized',
        responseValidator: unauthorizedErrorResponseValidator,
      },
      [ApiErrorCode.ResponseValidationFailed]: {
        status: '422' as const,
        description: 'Validation Error on Response. Always server-side problem. Introduced for debugging purposes, disabled in prod.',
        responseValidator: responseValidationErrorResponseValidator,
      },
    }).defineDefaultError({
      code: ApiErrorCode.UnknownError,
      body: {
        error: {
          code: ApiErrorCode.UnknownError,
        },
      },
    }).customizeRoutes(ApiRouteType).defineRouteContexts({
      [ApiRouteType.Public]: async () => {
        const context = {
          services: await this.createRequestServices(),
        };
        return context;
      },
      [ApiRouteType.User]: async (opts) => {
        const services = await this.createRequestServices();
        const viewer = await services.auth.getUserFromRequest(opts.request);
        if (!viewer) {
          throw new ApiError(ApiErrorCode.Unauthorized);
        }
        return {
          services: services,
          viewer,
        };
      },
      [ApiRouteType.Manager]: () => Promise.resolve({}),
    }).defineRoutes({
      [ApiRouteType.Public]: {
        authorization: false,
        errors: {
          [ApiErrorCode.UnknownError]: true,
          [ApiErrorCode.ValidationFailed]: true,
          [ApiErrorCode.ActionError]: true,
        },
      },
      [ApiRouteType.User]: {
        authorization: true,

        errors: {
          [ApiErrorCode.UnknownError]: true,
          [ApiErrorCode.ValidationFailed]: true,
          [ApiErrorCode.ActionError]: true,
          [ApiErrorCode.Unauthorized]: true,
        },
      },
      [ApiRouteType.Manager]: {
        authorization: false,
        errors: {
          [ApiErrorCode.UnknownError]: true,
          [ApiErrorCode.ValidationFailed]: true,
          [ApiErrorCode.ActionError]: true,
          [ApiErrorCode.Unauthorized]: true,
          [ApiErrorCode.MissingPermission]: true,
        },
      },
    }).defineGlobalConfig({
      handleError: (e) => {
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
      },
      skipDescriptionsCheck: true,
      basePath: '/api',
    }
  ).create();

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }
  createOpenApi() {
    return this.spec;
  }

  protected getActionErrorDescriptions(): Record<ActionErrorCode, string> {
    const result: Record<ActionErrorCode, string> = {
      [ActionErrorCode.InvalidPassword]: 'Invalid password',
      [ActionErrorCode.EmailAlreadyExists]: 'Email already exists',
      [ActionErrorCode.WorkoutNotFound]: 'Workout not found',
    };
    return result;
  }
  protected async createRequestServices(): Promise<ApiRequestServices> {
    const drizzle = this.drizzle;
    const exerciseService = new ExerciseService(drizzle);
    const services: ApiRequestServices = {
      auth: new AuthService(serverConfig.services.auth, drizzle),
      models: {
        argusCheckin: new ArgusCheckinService(drizzle),
        workout: new WorkoutService(drizzle, exerciseService),
        exercise: exerciseService,
        weight: new WeightService(drizzle),
      },
    };
    return services;
  }
}

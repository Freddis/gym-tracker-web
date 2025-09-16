import {OpenApiAnyRouteConfigMap, OpenApiRouteConfig} from 'snap-on-openapi';
import {ApiRouteType} from './ApiRouteType';
import {ApiErrorCode} from './ApiErrorCode';
import {ActionErrorCode} from './ActionErrorCode';
import {ApiRequestServices} from './ApiRequestServices';
import {ApiError} from '../errors/ApiError';
import {UserRouteContext} from './UserRouteContext';
import {PublicRouteContext} from './PublicRouteContext';
import {ManagerRouteContext} from './ManagerRouteContext';
import {GlobalServiceFactory} from '../../../utils/GlobalServiceFactory/GlobalServiceFactory';
import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {nativeEnum} from 'zod';

export class ApiRouteConfig implements OpenApiAnyRouteConfigMap<ApiRouteType, ApiErrorCode> {
  protected factory: GlobalServiceFactory;
  constructor(factory: GlobalServiceFactory) {
    this.factory = factory;
  }

  Manager: OpenApiRouteConfig<ApiRouteType.Manager, ApiErrorCode, undefined, ManagerRouteContext> = {
    authorization: true,
    extraProps: undefined,
    errors: {
      [ApiErrorCode.UnknownError]: true,
      [ApiErrorCode.ValidationFailed]: true,
      [ApiErrorCode.ActionError]: true,
      [ApiErrorCode.Unauthorized]: true,
      [ApiErrorCode.NotFound]: true,
    },
    contextFactory: async (ctx) => {
      const services = await this.createRequestServices();
      const viewer = await services.auth.getManagerFromRequest(ctx.request);
      if (!viewer) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      }
      const language = this.getRequestLangauge(ctx.request);
      return {
        services: services,
        viewer,
        language,
      };
    },
  };
  Public: OpenApiRouteConfig<ApiRouteType.Public, ApiErrorCode, undefined, PublicRouteContext> = {
    authorization: false,
    extraProps: undefined,
    errors: {
      [ApiErrorCode.UnknownError]: true,
      [ApiErrorCode.ValidationFailed]: true,
      [ApiErrorCode.ActionError]: true,
      [ApiErrorCode.NotFound]: true,
    },
    contextFactory: async (ctx) => ({
      services: await this.createRequestServices(),
      language: this.getRequestLangauge(ctx.request),
    }),
  };
  User: OpenApiRouteConfig<ApiRouteType.User, ApiErrorCode, undefined, UserRouteContext > = {
    authorization: true,
    extraProps: undefined,
    errors: {
      [ApiErrorCode.UnknownError]: true,
      [ApiErrorCode.ValidationFailed]: true,
      [ApiErrorCode.ActionError]: true,
      [ApiErrorCode.Unauthorized]: true,
      [ApiErrorCode.NotFound]: true,
    },
    contextFactory: async (ctx) => {
      const services = await this.createRequestServices();
      const viewer = await services.auth.getUserFromRequest(ctx.request);
      if (!viewer) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      }
      const language = this.getRequestLangauge(ctx.request);
      return {
        services: services,
        viewer,
        language,
      };
    },
  };

  protected getActionErrorDescriptions(): Record<ActionErrorCode, string> {
    const result: Record<ActionErrorCode, string> = {
      [ActionErrorCode.InvalidPassword]: 'Invalid password',
      [ActionErrorCode.EmailAlreadyExists]: 'Email already exists',
      [ActionErrorCode.WorkoutNotFound]: 'Workout not found',
    };
    return result;
  }
  public getRequestLangauge(request: Request): Language {
    const header = request.headers.get('Locale');
    const deafaultLang = Language.English;
    if (!header) {
      return deafaultLang;
    }
    const validated = nativeEnum(Language).safeParse(header);
    if (!validated.success) {
      return deafaultLang;
    }
    return validated.data;
  }
  protected async createRequestServices(): Promise<ApiRequestServices> {

    const services: ApiRequestServices = {
      auth: await this.factory.auth(),
      models: {
        argusCheckin: await this.factory.argusCheckin(),
        workout: await this.factory.workout(),
        exercise: await this.factory.exercise(),
        weight: await this.factory.weight(),
        entry: await this.factory.entry(),
        user: await this.factory.user(),
        manager: await this.factory.manager(),
        workoutPlan: await this.factory.workoutPlan(),
        workoutType: await this.factory.workoutType(),
        translation: await this.factory.translation(),
      },
    };
    return services;
  }
}

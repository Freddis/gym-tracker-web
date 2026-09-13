import {OpenApiRouteConfig, OpenApiRouteConfigMap} from 'snap-on-openapi';
import {ApiRouteType} from './ApiRouteType';
import {ApiErrorCode} from './ApiErrorCode';
import {ApiRequestServices} from './ApiRequestServices';
import {ApiError} from '../errors/ApiError';
import {UserRouteContext} from './UserRouteContext';
import {PublicRouteContext} from './PublicRouteContext';
import {ManagerRouteContext} from './ManagerRouteContext';
import {GlobalServiceFactory} from '../../../utils/GlobalServiceFactory/GlobalServiceFactory';
import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {nativeEnum} from 'zod';
import {ApiRouteContextMap} from './ApiRouteContextMap';
import {ApiRouteParamsMap} from './ApiRouteParamsMap';
import {ApiVersionError} from '../errors/ApiVersionErrror';

export class ApiRouteConfig implements OpenApiRouteConfigMap<ApiRouteType, ApiErrorCode, ApiRouteParamsMap, ApiRouteContextMap> {
  protected factory: GlobalServiceFactory;
  protected baseUrl: string;
  protected apiVersion: string;

  constructor(factory: GlobalServiceFactory, baseUrl: string, apiVersion: string) {
    this.factory = factory;
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion;
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
      [ApiErrorCode.ApiVersionMismatch]: true,
    },
    contextFactory: async (ctx) => {
      this.validateRequestApiVersion(ctx.request);
      const services = await this.createRequestServices();
      const viewer = await services.auth.getManagerFromRequest(ctx.request);
      if (!viewer) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      }
      const language = this.getRequestLangauge(ctx.request);
      return {
        baseUrl: this.baseUrl,
        services: {
          ...services,
          image: await this.factory.managedImage(),
        },
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
      [ApiErrorCode.ApiVersionMismatch]: true,
    },
    contextFactory: async (ctx) => {
      this.validateRequestApiVersion(ctx.request);
      const services = await this.createRequestServices();
      const viewer = await services.auth.getUserFromRequest(ctx.request);
      return {
        baseUrl: this.baseUrl,
        services: services,
        language: this.getRequestLangauge(ctx.request),
        viewer,
      };
    },
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
      [ApiErrorCode.ApiVersionMismatch]: true,
    },
    contextFactory: async (ctx) => {
      this.validateRequestApiVersion(ctx.request);
      const services = await this.createRequestServices();
      const viewer = await services.auth.getUserFromRequest(ctx.request);
      if (!viewer) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      }
      const language = this.getRequestLangauge(ctx.request);
      return {
        baseUrl: this.baseUrl,
        services: {
          ...services,
          image: await this.factory.image(),
          settings: await this.factory.settings(),
          profile: await this.factory.profile(),
        },
        viewer,
        language,
      };
    },
  };

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

  protected validateRequestApiVersion(request: Request): void {
    const version = this.getRequestApiVersion(request);
    if (version !== this.apiVersion) {
      throw new ApiVersionError();
    }
  }

  protected getRequestApiVersion(request: Request): string | null {
    const header = request.headers.get('apiVersion');
    return header ?? null;
  }

  protected async createRequestServices(): Promise<ApiRequestServices> {
    const services: ApiRequestServices = {
      auth: await this.factory.auth(),
      models: {
        argusCheckin: await this.factory.argusCheckin(),
        workout: await this.factory.workout(),
        exercise: await this.factory.exercise(),
        feedEntry: await this.factory.feedEntry(),
        weight: await this.factory.weight(),
        entry: await this.factory.entry(),
        user: await this.factory.user(),
        manager: await this.factory.manager(),
        workoutPlan: await this.factory.workoutPlan(),
        workoutType: await this.factory.workoutType(),
        translation: await this.factory.translation(),
        food: await this.factory.food(),
        script: await this.factory.script(),
      },
    };
    return services;
  }
}

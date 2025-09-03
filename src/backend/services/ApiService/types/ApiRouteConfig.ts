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

export class ApiRouteConfig implements OpenApiAnyRouteConfigMap<ApiRouteType, ApiErrorCode> {
  protected factory: GlobalServiceFactory;
  constructor(factory: GlobalServiceFactory) {
    this.factory = factory;
  }

  Manager: OpenApiRouteConfig<ApiRouteType.Manager, ApiErrorCode, undefined, ManagerRouteContext> = {
    authorization: false,
    extraProps: undefined,
    contextFactory: async (ctx) => {
      const services = await this.createRequestServices();
      const viewer = await services.auth.getManagerFromRequest(ctx.request);
      if (!viewer) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      }
      return {
        services: services,
        viewer,
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
    contextFactory: async () => ({services: await this.createRequestServices()}),
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
      return {
        services: services,
        viewer,
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
      },
    };
    return services;
  }
}

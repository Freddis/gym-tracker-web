import {OpenApiAnyRouteConfigMap, OpenApiRouteConfig} from 'strap-on-openapi';
import {ApiRouteType} from './ApiRouteType';
import {ApiErrorCode} from './ApiErrorCode';
import {serverConfig} from '../../../utils/ServerConfig/config';
import {ArgusCheckinService} from '../../ArgusCheckinService/ArgusCheckinService';
import {AuthService} from '../../AuthService/AuthService';
import {ExerciseService} from '../../ExerciseService/ExerciseService';
import {WeightService} from '../../WeightService/WeightService';
import {WorkoutService} from '../../WorkoutService/WorkoutService';
import {ActionErrorCode} from './ActionErrorCode';
import {ApiRequestServices} from './ApiRequestServices';
import {DrizzleService} from '../../DrizzleService/DrizzleService';
import {ApiError} from '../errors/ApiError';
import {UserRouteContext} from './UserRouteContext';
import {PublicRouteContext} from './PublicRouteContext';
import {EntryService} from '../../EntryService/EntryService';
import {UserService} from '../../UserService/UserService';

export class ApiRouteConfig implements OpenApiAnyRouteConfigMap<ApiRouteType, ApiErrorCode> {
  protected drizzle: DrizzleService;
  constructor(service: DrizzleService) {
    this.drizzle = service;
  }

  Manager: OpenApiRouteConfig<ApiRouteType.Manager, ApiErrorCode, undefined, undefined> = {
    authorization: false,
    extraProps: undefined,
    contextFactory: async () => (undefined),
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
    const drizzle = this.drizzle;
    const exercise = new ExerciseService(drizzle);
    const user = new UserService(drizzle);
    const workout = new WorkoutService(drizzle, exercise);
    const entry = new EntryService(user, workout);
    const argusCheckin = new ArgusCheckinService(drizzle);
    const weight = new WeightService(drizzle);
    const services: ApiRequestServices = {
      auth: new AuthService(serverConfig.services.auth, drizzle),
      models: {
        argusCheckin,
        workout,
        exercise,
        weight,
        entry,
        user,
      },
    };
    return services;
  }
}

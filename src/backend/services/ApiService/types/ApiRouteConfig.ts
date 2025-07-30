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
import {UserRow} from '../../DrizzleService/types/UserRow';


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
  Public: OpenApiRouteConfig<ApiRouteType.Public, ApiErrorCode, undefined, {services: ApiRequestServices}> = {
    authorization: false,
    extraProps: undefined,
    contextFactory: async () => ({services: await this.createRequestServices()}),
  };
  User: OpenApiRouteConfig<ApiRouteType.User, ApiErrorCode, undefined, {services: ApiRequestServices, viewer: UserRow }> = {
    authorization: false,
    extraProps: undefined,
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

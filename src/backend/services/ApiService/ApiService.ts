import {ArgusCheckinService} from '../ArgusCheckinService/ArgusCheckinService';
import {AuthService} from '../AuthService/AuthService';
import {ExerciseService} from '../ExerciseService/ExerciseService';
import {WeightService} from '../WeightService/WeightService';
import {WorkoutService} from '../WorkoutService/WorkoutService';
import {serverConfig} from '../../utils/ServerConfig/config';
import {ActionErrorCode} from './types/ActionErrorCode';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {ApiRequestServices} from './types/ApiRequestServices';
import {openApiRoutes} from './utils/openApiRoutes';
import {OpenApi} from 'strap-on-openapi';
import {ApiConfig} from './types/ApiConfig';
import {ApiErrorCode} from './types/ApiErrorCode';
import {ApiRouteType} from './types/ApiRouteType';

export class ApiService {
  protected drizzle: DrizzleService;

  constructor(drizzle: DrizzleService) {
    this.drizzle = drizzle;
  }
  createOpenApi() {
    const api = OpenApi.builder.create(ApiRouteType, ApiErrorCode, new ApiConfig(this.drizzle));
    api.addRouteMap(openApiRoutes);
    return api;
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

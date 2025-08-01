import {DrizzleService} from '../DrizzleService/DrizzleService';
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

}

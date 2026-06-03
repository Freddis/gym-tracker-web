import {openApiRoutes} from './utils/openApiRoutes';
import {OpenApi, OpenApiRouteMap} from 'snap-on-openapi';
import {ApiConfig} from './types/ApiConfig';
import {ApiErrorCode} from './types/ApiErrorCode';
import {ApiRouteType} from './types/ApiRouteType';
import {GlobalServiceFactory} from '../../utils/GlobalServiceFactory/GlobalServiceFactory';
import {Logger} from '../../utils/Logger/Logger';

export class ApiService {
  protected factory: GlobalServiceFactory;
  protected baseUrl: string;
  protected logger: Logger;

  constructor(factory: GlobalServiceFactory, baseUrl: string) {
    this.factory = factory;
    this.baseUrl = baseUrl;
    this.logger = new Logger(ApiService.name);
  }

  createOpenApi() {
    const api = OpenApi.builder.create(ApiRouteType, ApiErrorCode, new ApiConfig(this.factory, this.baseUrl, this.logger));
    const newMap: OpenApiRouteMap<ApiRouteType> = {};
    for (const key of Object.keys(openApiRoutes)) {
      const routes = openApiRoutes[key];
      if (!routes) {
        continue;
      }
      newMap[key] = routes.map((route) => api.factory.createRoute(route));
    }
    api.addRouteMap(newMap);
    return api;
  }

}

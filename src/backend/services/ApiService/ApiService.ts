import {openApiRoutes} from './utils/openApiRoutes';
import {OpenApi} from 'snap-on-openapi';
import {ApiConfig} from './types/ApiConfig';
import {ApiErrorCode} from './types/ApiErrorCode';
import {ApiRouteType} from './types/ApiRouteType';
import {GlobalServiceFactory} from '../../utils/GlobalServiceFactory/GlobalServiceFactory';

export class ApiService {
  protected factory: GlobalServiceFactory;
  protected baseUrl: string;

  constructor(factory: GlobalServiceFactory, baseUrl: string) {
    this.factory = factory;
    this.baseUrl = baseUrl;
  }
  createOpenApi() {
    const api = OpenApi.builder.create(ApiRouteType, ApiErrorCode, new ApiConfig(this.factory, this.baseUrl));
    api.addRouteMap(openApiRoutes);
    return api;
  }

}

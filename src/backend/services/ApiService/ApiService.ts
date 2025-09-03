import {openApiRoutes} from './utils/openApiRoutes';
import {OpenApi} from 'snap-on-openapi';
import {ApiConfig} from './types/ApiConfig';
import {ApiErrorCode} from './types/ApiErrorCode';
import {ApiRouteType} from './types/ApiRouteType';
import {GlobalServiceFactory} from '../../utils/GlobalServiceFactory/GlobalServiceFactory';

export class ApiService {
  protected factory: GlobalServiceFactory;

  constructor(factory: GlobalServiceFactory) {
    this.factory = factory;
  }
  createOpenApi() {
    const api = OpenApi.builder.create(ApiRouteType, ApiErrorCode, new ApiConfig(this.factory));
    api.addRouteMap(openApiRoutes);
    return api;
  }

}

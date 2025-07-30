import {OpenApiAnyConfig} from 'strap-on-openapi';
import {ApiRouteType} from './ApiRouteType';
import {ApiErrorCode} from './ApiErrorCode';
import {ApiRouteConfig} from './ApiRouteConfig';
import {ApiErrorConfigMap} from './ApiErrorConfigMap';
import {DrizzleService} from '../../DrizzleService/DrizzleService';

export class ApiConfig implements OpenApiAnyConfig<ApiRouteType, ApiErrorCode> {
  basePath = '/api' as const;
  routes: ApiRouteConfig;
  errors = new ApiErrorConfigMap();
  defaultError = {
    code: ApiErrorCode.UnknownError,
    body: {
      error: ApiErrorCode.UnknownError,
    },
  } as const;
  handleError = undefined;
  skipDescriptionsCheck?: boolean = true;

  constructor(service: DrizzleService) {
    this.routes = new ApiRouteConfig(service);
  }
}

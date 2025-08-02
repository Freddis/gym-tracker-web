import {OpenApi, OpenApiValidationUtils} from 'strap-on-openapi';
import {ApiErrorCode} from '../types/ApiErrorCode';
import {ApiRouteType} from '../types/ApiRouteType';
import {ApiConfig} from '../types/ApiConfig';
export class RouteFactory {

  static createRoute: OpenApi<ApiRouteType, ApiErrorCode, ApiConfig>['factory']['createRoute'] = (route) => {
    return route;
  };

  static validators = new OpenApiValidationUtils();
}

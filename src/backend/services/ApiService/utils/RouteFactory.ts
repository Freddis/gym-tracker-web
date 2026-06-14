import {OpenApi, OpenApiValidationUtils} from 'snap-on-openapi';
import {ApiErrorCode} from '../types/ApiErrorCode';
import {ApiRouteType} from '../types/ApiRouteType';
import {ApiConfig} from '../types/ApiConfig';
import {object, string, ZodType} from 'zod';
export class RouteFactory {

  static createRoute: OpenApi<ApiRouteType, ApiErrorCode, ApiConfig>['factory']['createRoute'] = (route) => {
    return route;
  };

  static validators = new OpenApiValidationUtils();

  static cursorResponse<T>(validator: ZodType<T>) {
    return object({
      items: validator.array().openapi({description: 'Page or items'}),
      info: object({
        nextCursor: string().optional().openapi({description: 'Cursor for next page'}),
      }).openapi({description: 'Pagination details'}),
    });
  };
}

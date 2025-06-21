import {User} from 'src/backend/model/User/User';
import {AppOpenApiRequestServices} from './AppOpenApiRequestServices';
import {ApiRouteTypes} from './ApiRouteTypes';
import {RouteContextMap} from 'strap-on-openapi';


export interface AppOpenApiRouteContexts extends RouteContextMap<ApiRouteTypes> {
  Public: {
    services: AppOpenApiRequestServices
  }
  User: {
    viewer: User
    services: AppOpenApiRequestServices
  }
}

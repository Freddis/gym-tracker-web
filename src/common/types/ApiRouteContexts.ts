import {User} from 'src/backend/model/User/User';
import {ApiRequestServices} from './ApiRequestServices';
import {ApiRouteType} from './ApiRouteType';
import {RouteContextMap} from 'strap-on-openapi';


export interface ApiRouteContexts extends RouteContextMap<ApiRouteType> {
  Public: {
    services: ApiRequestServices
  }
  User: {
    viewer: User
    services: ApiRequestServices
  }
}

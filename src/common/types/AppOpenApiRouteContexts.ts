import {User} from 'src/backend/model/User/User';
import {RouteContextMap} from 'src/backend/services/OpenApiService/types/RouteContextMap';
import {AppOpenApiRequestServices} from './AppOpenApiRequestServices';
import {AppOpenApiRouteTypes} from './AppOpenApiRouteTypes';


export interface AppOpenApiRouteContexts extends RouteContextMap<AppOpenApiRouteTypes> {
  Public: {
    services: AppOpenApiRequestServices
  }
  User: {
    viewer: User
    services: AppOpenApiRequestServices
  }
}

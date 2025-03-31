import {RouteExtraPropsMap} from 'src/server/services/OpenApiService/types/RouteExtraPropsMap';
import {AppOpenApiRouteTypes} from './AppOpenApiRouteTypes';

export interface AppOpenApiExtraRouteProps extends RouteExtraPropsMap<AppOpenApiRouteTypes> {
  Manager: {
    permissions: string[],
  }
}

import {RouteExtraPropsMap} from 'strap-on-openapi';
import {ApiRouteTypes} from './ApiRouteTypes';

export interface AppOpenApiExtraRouteProps extends RouteExtraPropsMap<ApiRouteTypes> {
  Manager: {
    permissions: string[],
  }
}

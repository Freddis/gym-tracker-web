import {RouteExtraPropsMap} from 'strap-on-openapi';
import {ApiRouteType} from './ApiRouteType';

export interface ApiRoutePropsMap extends RouteExtraPropsMap<ApiRouteType> {
  Manager: {
    permissions: string[],
  }
}


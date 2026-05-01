import {ApiRouteType} from './ApiRouteType';
import {ManagerRouteContext} from './ManagerRouteContext';
import {PublicRouteContext} from './PublicRouteContext';
import {UserRouteContext} from './UserRouteContext';

export interface ApiRouteContextMap {
  [ApiRouteType.Manager]: () => Promise<ManagerRouteContext>;
  [ApiRouteType.User]: () => Promise<UserRouteContext>;
  [ApiRouteType.Public]: () => Promise<PublicRouteContext>;
}

import {UserRow} from '../../DrizzleService/types/UserRow';
import {PublicRouteContext} from './PublicRouteContext';

export interface UserRouteContext extends PublicRouteContext{
  viewer: UserRow
}

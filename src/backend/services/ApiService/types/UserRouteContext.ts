import {User} from '../../UserService/types/User';
import {PublicRouteContext} from './PublicRouteContext';

export interface UserRouteContext extends PublicRouteContext{
  viewer: User
}

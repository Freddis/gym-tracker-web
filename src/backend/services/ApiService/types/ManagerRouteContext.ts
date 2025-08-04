import {Manager} from '../../ManagerService/types/Manager';
import {PublicRouteContext} from './PublicRouteContext';

export interface ManagerRouteContext extends PublicRouteContext{
  viewer: Manager
}

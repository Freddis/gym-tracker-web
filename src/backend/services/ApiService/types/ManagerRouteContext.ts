import {ManagedImageService} from '../../ImageService/ManagedImageService';
import {Manager} from '../../ManagerService/types/Manager';
import {ApiRequestServices} from './ApiRequestServices';
import {PublicRouteContext} from './PublicRouteContext';

export interface ManagerRouteContext extends PublicRouteContext{
  viewer: Manager
  services: ApiRequestServices & {
    image: ManagedImageService
  }
}

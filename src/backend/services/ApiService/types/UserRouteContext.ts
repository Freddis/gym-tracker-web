import {ImageService} from '../../ImageService/ImageService';
import {User} from '../../UserService/types/User';
import {ApiRequestServices} from './ApiRequestServices';
import {PublicRouteContext} from './PublicRouteContext';

export interface UserRouteContext extends PublicRouteContext{
  viewer: User
  services: ApiRequestServices & {
    image: ImageService
  }
}

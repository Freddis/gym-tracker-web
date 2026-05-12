import {ImageService} from '../../ImageService/ImageService';
import {SettingsService} from '../../SettingsService/SettingsService';
import {User} from '../../UserService/types/User';
import {ProfileService} from '../ProfileService/ProfileService';
import {ApiRequestServices} from './ApiRequestServices';
import {PublicRouteContext} from './PublicRouteContext';

export interface UserRouteContext extends PublicRouteContext{
  viewer: User
  services: ApiRequestServices & {
    profile: ProfileService
    settings: SettingsService
    image: ImageService
  }
}

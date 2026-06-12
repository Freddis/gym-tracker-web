import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {User} from '../../UserService/types/User';
import {ApiRequestServices} from './ApiRequestServices';
export interface PublicRouteContext {
  language: Language
  baseUrl: string,
  services: ApiRequestServices
  viewer: User | null
}

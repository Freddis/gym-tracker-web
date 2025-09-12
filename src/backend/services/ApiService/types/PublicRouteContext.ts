import {Language} from '../../../../frontend/components/layout/LanguageProvider/enums/Language';
import {ApiRequestServices} from './ApiRequestServices';

export interface PublicRouteContext {
  language: Language
  services: ApiRequestServices
}

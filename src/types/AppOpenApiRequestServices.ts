import {AuthService} from 'src/server/services/AuthService/AuthService';
import {EntryService} from 'src/server/services/EntryService/EntryService';

export interface AppOpenApiRequestServices {
  auth: AuthService
  models: {
    entry: EntryService
  }
}

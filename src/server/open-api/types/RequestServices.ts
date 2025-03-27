import {EntryService} from 'src/server/services/EntryService/EntryService';

export interface RequestServices {
  models: {
    entry: EntryService
  }
}

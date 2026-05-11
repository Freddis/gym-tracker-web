import {EntryType} from './EntryType';
import {IEntryService} from './IEntryService';

export type EntryServiceMap = {
  [key in EntryType]: IEntryService<key>;
};

import {EntryObjectMap} from './EntryObjectMap';
import {EntryType} from './EntryType';

export type EntryObjectMapMap = {
  [key in EntryType]: Map<number, EntryObjectMap[key]>;
}

import {EntryType} from '../../EntryService/types/EntryType';
import {FeedEntryObjectMap} from './FeedEntryObjectMap';

export type FeedEntryObjectMapMap = {
  [key in EntryType]: Map<number, FeedEntryObjectMap[key]>;
}


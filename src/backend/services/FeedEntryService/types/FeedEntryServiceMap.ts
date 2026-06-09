import {EntryType} from '../../EntryService/types/EntryType';
import {IFeedEntryService} from './IFeedEntryService';

export type FeedEntryServiceMap = {
  [key in EntryType]: IFeedEntryService<key>;
 };

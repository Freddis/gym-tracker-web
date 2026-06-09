import {EntryType} from '../../EntryService/types/EntryType';
import {BaseEntry} from '../../EntryService/types/Entry';
import {NumericEntryKeys} from '../../EntryService/types/IEntryService';
import {FeedEntry} from './FeedEntry';
import {FeedEntryObjectMap} from './FeedEntryObjectMap';

export interface IFeedEntryService<TType extends EntryType> {
  getRelationKey(): FeedEntryObjectMap[TType] extends null ? null : NumericEntryKeys;
  construct(row: BaseEntry, value: FeedEntryObjectMap[TType]): FeedEntry & {type: TType};
  loadMap(ids: number[]): Promise<Map<number, FeedEntryObjectMap[TType]>>;
};

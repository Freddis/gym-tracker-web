import {EntryRow} from '../../DrizzleService/types/EntryRow';
import {BaseEntry, Entry} from './Entry';
import {EntryObjectMap} from './EntryObjectMap';
import {EntryType} from './EntryType';
import {EntryUpsertDto} from './EntryUpsertDto';

type NumericEntryKeys = {
  [K in keyof EntryRow]: Exclude<EntryRow[K], null> extends number ? K : never
}[keyof EntryRow];


export interface IEntryService<TType extends EntryType> {
  upsertOne(userId: number, item: EntryUpsertDto & {type: TType}): Promise<{
    id: number;
    value: EntryObjectMap[TType];
  }>;
  getRelationKey: () => EntryObjectMap[TType] extends null ? null : NumericEntryKeys;
  construct: (row: BaseEntry, value: EntryObjectMap[TType]) => Entry & {type: TType};
  loadMap: (ids: number[]) => Promise<Map<number, EntryObjectMap[TType]>>;
}

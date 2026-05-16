import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {Filter} from '../../../types/ModelService/types/Filter';
import {EntryType} from './EntryType';

export interface EntryFilter<T extends EntryType> extends Filter<string> {
  externalId?: string[],
  workoutIds?: number[],
  weightIds?: number[]
  userId?: number[],
  type?: T[],
  includeDeleted?: boolean,
  updatedAfter?: Date,
  language?:Language
  date?: Date,
  after?: Date,
  before?: Date,
}

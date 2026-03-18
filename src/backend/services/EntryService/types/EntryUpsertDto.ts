import {WeightUpsertDto} from '../../WeightService/types/WeightUpsertDto';
import {WorkoutUpsertDto} from '../../WorkoutService/types/WorkoutUpsertDto';
import {BaseEntry} from './Entry';
import {EntryType} from './EntryType';

export interface WorkoutEntryUpsertDto extends Omit<BaseEntry, 'id'| 'user'> {
  id?: number
  type: EntryType.Workout
  workout: WorkoutUpsertDto
}
export interface WeightEntryUpsertDto extends Omit<BaseEntry, 'id'| 'user'> {
  id?: number
  type: EntryType.Weight
  weight: WeightUpsertDto
}
export type EntryUpsertDto = WorkoutEntryUpsertDto | WeightEntryUpsertDto

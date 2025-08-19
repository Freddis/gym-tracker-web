import {WorkoutCreateDto} from '../../WorkoutService/types/WorkoutCreateDto';
import {BaseEntry} from './Entry';
import {EntryType} from './EntryType';

type BaseEntryCreateDto = Omit<BaseEntry, 'id'|'user'|'createdAt'|'updatedAt'|'deletedAt'>

export interface WeightEntryCreateDto extends BaseEntryCreateDto {
  type: EntryType.Weight,
  weight: number
}

export interface WorkoutEntryCreateDto extends BaseEntryCreateDto {
  type: EntryType.Workout,
  workout: Omit<WorkoutCreateDto, 'userId'>
}

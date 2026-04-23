import {WorkoutCreateDto} from '../../WorkoutService/types/WorkoutCreateDto';
import {EntryVisibility} from './EntryVisibility';

interface BaseEntryCreateDto {
  visibility: EntryVisibility
  time: Date
}

export interface PostEntryCreateDto extends BaseEntryCreateDto {
  note: string | null
  data: string | null
}
export interface WeightEntryCreateDto extends BaseEntryCreateDto {
  weight: number
}

export interface WorkoutEntryCreateDto extends BaseEntryCreateDto {
  workout: Omit<WorkoutCreateDto, 'userId'>
}

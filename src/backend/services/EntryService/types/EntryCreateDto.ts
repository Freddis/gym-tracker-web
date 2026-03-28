import {WorkoutCreateDto} from '../../WorkoutService/types/WorkoutCreateDto';
import {EntryVisibility} from './EntryVisibility';

interface BaseEntryCreateDto {
  visibility: EntryVisibility
}

export interface ImageEntryCreateDto extends BaseEntryCreateDto {
  data: string
}
export interface WeightEntryCreateDto extends BaseEntryCreateDto {
  weight: number
}

export interface WorkoutEntryCreateDto extends BaseEntryCreateDto {
  workout: Omit<WorkoutCreateDto, 'userId'>
}

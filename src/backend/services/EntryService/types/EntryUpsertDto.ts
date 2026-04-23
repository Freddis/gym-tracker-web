import {ImageRow} from '../../DrizzleService/types/ImageRow';
import {WeightUpsertDto} from '../../WeightService/types/WeightUpsertDto';
import {WorkoutUpsertDto} from '../../WorkoutService/types/WorkoutUpsertDto';
import {BaseEntry} from './Entry';
import {EntryType} from './EntryType';

interface ImageUpsertDto extends Omit<ImageRow, 'userId'| 'createdAt'| 'updatedAt'| 'deletedAt' | 'url'> {
  url: string | null
  data: string | null
}
interface BaseEntryUpsertDto extends Omit<BaseEntry, 'id'| 'user'| 'image'> {
  image: ImageUpsertDto | null
}
export interface WorkoutEntryUpsertDto extends BaseEntryUpsertDto {
  id?: number
  type: EntryType.Workout
  workout: WorkoutUpsertDto
}
export interface WeightEntryUpsertDto extends BaseEntryUpsertDto {
  id?: number
  type: EntryType.Weight
  weight: WeightUpsertDto
}

export interface PostEntryUpsertDto extends BaseEntryUpsertDto {
  id?: number
  type: EntryType.Post
}

export type EntryUpsertDto = WorkoutEntryUpsertDto | WeightEntryUpsertDto | PostEntryUpsertDto

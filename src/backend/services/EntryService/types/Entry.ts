import {EntryRow} from '../../DrizzleService/types/EntryRow';
import {ImageRow} from '../../DrizzleService/types/ImageRow';
import {User} from '../../UserService/types/User';
import {Weight} from '../../WeightService/types/Weight';
import {Workout} from '../../WorkoutService/types/Workout';
import {EntryType} from './EntryType';
import {EntryVisibility} from './EntryVisibility';

export interface BaseEntry extends Omit<EntryRow, 'userId'|'workoutId'|'weightId'|'imageId'> {
  user: User
  type: EntryType
  visibility: EntryVisibility,
  createdAt: Date,
  deletedAt: Date | null,
  updatedAt: Date | null,
}

export interface WorkoutEntry extends BaseEntry {
  type: EntryType.Workout
  workout: Workout
}


export interface WeightEntry extends BaseEntry {
  type: EntryType.Weight
  weight: Weight
}

export interface ImageEntry extends BaseEntry {
  type: EntryType.Image
  image: ImageRow
}
export type Entry = WorkoutEntry | WeightEntry | ImageEntry

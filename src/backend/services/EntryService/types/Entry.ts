import {User} from '../../UserService/types/User';
import {Weight} from '../../WeightService/types/Weight';
import {Workout} from '../../WorkoutService/types/Workout';
import {EntryType} from './EntryType';

export interface BaseEntry {
  id: number
  user: User
  type: EntryType
}

export interface WorkoutEntry extends BaseEntry {
  type: EntryType.Workout
  workout: Workout
}


export interface WeightEntry extends BaseEntry {
  type: EntryType.Weight
  weight: Weight
}

export type Entry = WorkoutEntry | WeightEntry

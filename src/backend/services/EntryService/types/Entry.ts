import {OutdoorRun} from '../../OutdoorRunService/types/OutdoorRun';
import {OutdoorWalk} from '../../OutdoorWalkService/types/OutdoorWalk';
import {User} from '../../UserService/types/User';
import {Weight} from '../../WeightService/types/Weight';
import {Workout} from '../../WorkoutService/types/Workout';
import {EntryType} from './EntryType';
import {EntryVisibility} from './EntryVisibility';
import {ExternalSource} from './ExternalSource';
import {Image} from '../../ImageService/types/Image';
import {Meal} from '../../MealService/types/Meal';
import {CalorieGoal} from '../../CalorieGoalService/types/CalorieGoal';
export interface BaseEntry {
  id: string;
  // userId: number;
  title: string | null;
  note: string | null;
  externalId: string | null;
  externalSource: ExternalSource | null;
  // workoutId: number | null;
  // weightId: number | null;
  // imageId: number | null;
  // outdoorRunId: number | null;
  user: User
  type: EntryType
  visibility: EntryVisibility,
  time: Date,
  createdAt: Date,
  deletedAt: Date | null,
  updatedAt: Date | null,
  image: Image | null
  healthkitId: string | null;
  healthkitAnchor: number | null;
  healthkitAnchors_3_0: string | null;
  healthkitSource: string | null;
  healthkitSourceName: string | null;
  healthkitDevice: string | null;
  healthkitDeviceName: string | null;
}

export interface WorkoutEntry extends BaseEntry {
  type: EntryType.Workout
  workout: Workout
}

export interface WeightEntry extends BaseEntry {
  type: EntryType.Weight
  weight: Weight
}

export interface PostEntry extends BaseEntry {
  type: EntryType.Post
}

export interface OutdoorRunEntry extends BaseEntry {
  type: EntryType.OutdoorRun
  outdoorRun: OutdoorRun
}

export interface OutdoorWalkEntry extends BaseEntry {
  type: EntryType.OutdoorWalk
  outdoorWalk: OutdoorWalk
}

export interface MealEntry extends BaseEntry {
  type: EntryType.Meal
  meal: Meal
}

export interface CalorieGoalEntry extends BaseEntry {
  type: EntryType.CalorieGoal
  calorieGoal: CalorieGoal
}
export type Entry = WorkoutEntry | WeightEntry | PostEntry | OutdoorRunEntry | OutdoorWalkEntry | MealEntry | CalorieGoalEntry

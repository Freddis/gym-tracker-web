import {StrictOmit} from '../../../types/StrictOmit';
import {CalorieGoalUpsertDto} from '../../CalorieGoalService/types/CalorieGoalUpsertDto';
import {MealUpsertDto} from '../../MealService/types/MealUpsertDto';
import {OutdoorRunUpsertDto} from '../../OutdoorRunService/types/OutdoorRunUpsertDto';
import {OutdoorWalkUpsertDto} from '../../OutdoorWalkService/types/OutdoorWalkUpsertDto';
import {WeightUpsertDto} from '../../WeightService/types/WeightUpsertDto';
import {WorkoutUpsertDto} from '../../WorkoutService/types/WorkoutUpsertDto';
import {BaseEntry} from './Entry';
import {EntryType} from './EntryType';

export interface ImageUpsertDto {
  data: string
}
interface BaseEntryUpsertDto extends StrictOmit<BaseEntry, | 'user'| 'image'> {
  image?: ImageUpsertDto | null
}
export interface WorkoutEntryUpsertDto extends BaseEntryUpsertDto {
  type: EntryType.Workout
  workout: WorkoutUpsertDto
}
export interface WeightEntryUpsertDto extends BaseEntryUpsertDto {
  type: EntryType.Weight
  weight: WeightUpsertDto
}

export interface PostEntryUpsertDto extends BaseEntryUpsertDto {
  type: EntryType.Post
}

export interface OutdoorRunEntryUpsertDto extends BaseEntryUpsertDto {
  type: EntryType.OutdoorRun
  outdoorRun: OutdoorRunUpsertDto
}
export interface OutdoorWalkEntryUpsertDto extends BaseEntryUpsertDto {
  type: EntryType.OutdoorWalk
  outdoorWalk: OutdoorWalkUpsertDto
}
export interface MealEntryUpsertDto extends BaseEntryUpsertDto {
  type: EntryType.Meal
  meal: MealUpsertDto
}
export interface CalorieGoalEntryUpsertDto extends BaseEntryUpsertDto {
  type: EntryType.CalorieGoal
  calorieGoal: CalorieGoalUpsertDto
}
export type EntryUpsertDto = WorkoutEntryUpsertDto
| WeightEntryUpsertDto
| PostEntryUpsertDto
| OutdoorRunEntryUpsertDto
| OutdoorWalkEntryUpsertDto
| MealEntryUpsertDto
| CalorieGoalEntryUpsertDto

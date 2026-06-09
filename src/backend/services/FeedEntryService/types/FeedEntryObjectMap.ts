import {CalorieGoal} from '../../CalorieGoalService/types/CalorieGoal';
import {EntryType} from '../../EntryService/types/EntryType';
import {Meal} from '../../MealService/types/Meal';
import {Weight} from '../../WeightService/types/Weight';
import {Workout} from '../../WorkoutService/types/Workout';
import {ReducedOutdoorRun} from '../services/ReducedOutdoorRunService/types/ReducedOutdoorRun';
import {ReducedOutdoorWalk} from '../services/ReducedOutdoorWalkService/types/ReducedOutdoorWalk';

export type FeedEntryObjectMap = Record<EntryType, unknown> & {
  [EntryType.Weight]: Weight;
  [EntryType.Workout]: Workout;
  [EntryType.Post]: null;
  [EntryType.OutdoorRun]: ReducedOutdoorRun;
  [EntryType.OutdoorWalk]: ReducedOutdoorWalk;
  [EntryType.Meal]: Meal;
  [EntryType.CalorieGoal]: CalorieGoal;
}

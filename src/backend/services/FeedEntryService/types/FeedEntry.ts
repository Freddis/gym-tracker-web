import {WorkoutEntry, WeightEntry, PostEntry, MealEntry, CalorieGoalEntry} from '../../EntryService/types/Entry';
import {OutdoorRunFeedEntry} from './OutdoorRunFeedEntry';
import {OutdoorWalkFeedEntry} from './OutdoorWalkFeedEntry';

export type FeedEntry = WorkoutEntry | WeightEntry | PostEntry | OutdoorRunFeedEntry | OutdoorWalkFeedEntry | MealEntry | CalorieGoalEntry

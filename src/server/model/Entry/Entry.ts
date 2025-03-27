import {z} from 'zod';
import {weightLiftingEntryValidator} from './validators/WeightLiftingEntry';
import {workoutEntryValidator} from './validators/WorkoutEntry';
import {stepsEntryValidator} from './validators/StepsEntry';
import {weatherEntryValidator} from './validators/WeatherEntry';
import {weightEntryValidator} from './validators/WeightEntry';
import {walkingEntryValidator} from './validators/WalkingEntry';
import {caloriesEntryValidator} from './validators/CaloriesEntry';

export const entryValidator = z.union([
  stepsEntryValidator,
  workoutEntryValidator,
  weatherEntryValidator,
  weightLiftingEntryValidator,
  weightEntryValidator,
  walkingEntryValidator,
  caloriesEntryValidator,
]);
export type EntryValidator = typeof entryValidator
export type Entry = z.TypeOf<EntryValidator>

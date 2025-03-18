import {z} from 'zod';
import {weightLiftingEntryValidator} from './validators/WeightLiftingEntry';
import {workoutEntryValidator} from './validators/WorkoutEntry';
import {stepsEntryValidator} from './validators/StepsEntry';
import {weatherEntryValidator} from './validators/WeatherEntry';
import {weightEntryValidator} from './validators/WeightEntry';
import {walkingEntryValidator} from './validators/WalkingEntry';

export const entryValidator = z.union([
  stepsEntryValidator,
  workoutEntryValidator,
  weatherEntryValidator,
  weightLiftingEntryValidator,
  weightEntryValidator,
  walkingEntryValidator,
]);
export type EntryValidator = typeof entryValidator
export type Entry = z.TypeOf<EntryValidator>

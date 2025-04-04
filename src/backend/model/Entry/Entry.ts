import {z} from 'zod';
import {weightLiftingEntryValidator} from './validators/WeightLiftingEntry';
import {workoutEntryValidator} from './validators/WorkoutEntry';
import {stepsEntryValidator} from './validators/StepsEntry';
import {weatherEntryValidator} from './validators/WeatherEntry';
import {weightEntryValidator} from './validators/WeightEntry';
import {walkingEntryValidator} from './validators/WalkingEntry';
import {caloriesEntryValidator} from './validators/CaloriesEntry';
import {consumedCaloriesEntryValidator} from './validators/ConsumedCaloriesEntry';
import {drinkEntryValidator} from './validators/DrinkEntry';
import {workoutLogEntryValidator} from './validators/WorkoutLogEntry';
import {fitnessTestEntryValidator} from './validators/FitnessTestEntry';
import {sleepReportEntryValidator} from './validators/SleepReportEntry';
import {bodyMetricsEntryValidator} from './validators/BodyMetricsEntry';
import {statusEntryValidator} from './validators/StatusEntry';
import {heartRateEntryValidator} from './validators/HeartRateEntry';
import {foodEntryValidator} from './validators/FoodEntry';

export const entryValidator = z.union([
  stepsEntryValidator,
  workoutEntryValidator,
  weatherEntryValidator,
  weightLiftingEntryValidator,
  weightEntryValidator,
  walkingEntryValidator,
  caloriesEntryValidator,
  consumedCaloriesEntryValidator,
  drinkEntryValidator,
  workoutLogEntryValidator,
  fitnessTestEntryValidator,
  sleepReportEntryValidator,
  bodyMetricsEntryValidator,
  statusEntryValidator,
  heartRateEntryValidator,
  foodEntryValidator,
]);
export type EntryValidator = typeof entryValidator
export type Entry = z.TypeOf<EntryValidator>

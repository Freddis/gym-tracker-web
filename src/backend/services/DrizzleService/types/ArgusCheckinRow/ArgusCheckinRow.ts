import {z} from 'zod';
import {argusWeightLiftingCheckinValidator} from './validators/ArgusWeightLiftingCheckin';
import {argusWorkoutCheckinValidator} from './validators/ArgusWorkoutCheckin';
import {argusStepsCheckinValidator} from './validators/ArgusStepsCheckin';
import {argusWeatherCheckinValidator} from './validators/ArgusWeatherCheckin';
import {argusWeightCheckinValidator} from './validators/ArgusWeightCheckin';
import {argusWalkingCheckinValidator} from './validators/ArgusWalkingCheckin';
import {argusCaloriesCheckinValidator} from './validators/ArgusCaloriesCheckin';
import {argusConsumedCaloriesCheckinValidator} from './validators/ArgusConsumedCaloriesCheckin';
import {argusDrinkCheckinValidator} from './validators/ArgusDrinkCheckin';
import {argusWorkoutLogCheckinValidator} from './validators/ArgusWorkoutLogCheckin';
import {argusFitnessTestCheckinValidator} from './validators/ArgusFitnessTestCheckin';
import {argusSleepReportCheckinValidator} from './validators/ArgusSleepReportCheckin';
import {argusBodyMetricsCheckinValidator} from './validators/ArgusBodyMetricsCheckin';
import {argusStatusCheckinValidator} from './validators/ArgusStatusCheckin';
import {argusHeartRateCheckinyValidator} from './validators/ArgusHeartRateCheckin';
import {argusFoodCheckinValidator} from './validators/ArgusFoodCheckin';

export const argusCheckinRowValidator = z.union([
  argusStepsCheckinValidator,
  argusWorkoutCheckinValidator,
  argusWeatherCheckinValidator,
  argusWeightLiftingCheckinValidator,
  argusWeightCheckinValidator,
  argusWalkingCheckinValidator,
  argusCaloriesCheckinValidator,
  argusConsumedCaloriesCheckinValidator,
  argusDrinkCheckinValidator,
  argusWorkoutLogCheckinValidator,
  argusFitnessTestCheckinValidator,
  argusSleepReportCheckinValidator,
  argusBodyMetricsCheckinValidator,
  argusStatusCheckinValidator,
  argusHeartRateCheckinyValidator,
  argusFoodCheckinValidator,
]);
export type ArgusCheckinValidator = typeof argusCheckinRowValidator
export type ArgusCheckinRow = z.TypeOf<ArgusCheckinValidator>

import {array, date, number, object} from 'zod';
import {heartRatePointValidator} from './heartRatePointValidator';
import {pathPointValidator} from './pathPointValidator';

export const outdoorRunValidator = object({
  id: number().openapi({description: 'Id of the outdoor run'}),
  userId: number().openapi({description: 'User id of the outdoor run'}),
  distance: number().openapi({description: 'Distance of the outdoor run'}),
  duration: number().openapi({description: 'Duration of the outdoor run'}),
  calories: number().openapi({description: 'Calories of the outdoor run'}),
  pace: number().openapi({description: 'Pace of the outdoor run'}),
  maxPace: number().openapi({description: 'Max pace of the outdoor run'}),
  cadence: number().nullable().openapi({description: 'Cadence of the outdoor run'}),
  maxCadence: number().nullable().openapi({description: 'Max cadence of the outdoor run'}),
  heartRate: number().nullable().openapi({description: 'Heart rate of the outdoor run'}),
  maxHeartRate: number().nullable().openapi({description: 'Max heart rate of the outdoor run'}),
  start: date().openapi({description: 'Start time of the outdoor run'}),
  end: date().openapi({description: 'End time of the outdoor run'}),
  elevationGain: number().nullable().openapi({description: 'Elevation gain of the outdoor run'}),
  geoData: array(pathPointValidator).nullable().openapi({description: 'Geo data of the outdoor walk'}),
  heartRateData: array(heartRatePointValidator).nullable().openapi({description: 'Heart rate data of the outdoor walk'}),
}).openapi({ref: 'OutdoorRun', description: 'Outdoor run'});

import {array, date, nativeEnum, number, object, string} from 'zod';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {userValidator} from '../../users/validators/userValidator';
import {workoutValidator} from '../../workouts/validators/workoutValidator';
import {weightValidator} from '../../weight/validators/weightValidator';
import {EntryVisibility} from '../../../../EntryService/types/EntryVisibility';
import {imageValidator} from '../../images/validators/imageValidator';
import {externalSourceValidator} from './externalSourceValidator';

const baseEntryValidator = object({
  id: number().openapi({description: 'Id of an entry'}),
  user: userValidator,
  visibility: nativeEnum(EntryVisibility).openapi({description: 'Visibility of the entry', ref: 'Entry Visibility'}),
  time: date().openapi({description: 'Time of the entry. Can be changed by user.'}),
  createdAt: date().openapi({description: 'Date of the entry, when the entry was created by user. Immutable.'}),
  updatedAt: date().nullable().openapi({description: 'Date of the last update'}),
  deletedAt: date().nullable().openapi({description: 'Date of the deletion'}),
  title: string().nullable().openapi({description: 'Title of the entry'}),
  note: string().nullable().openapi({description: 'Note of the entry'}),
  externalId: string().nullable().openapi({description: 'External id of the entry'}),
  externalSource: externalSourceValidator.nullable().openapi({description: 'External source of the entry. Another app.'}),
});

export const heartRatePointValidator = object({
  timestamp: number().openapi({description: 'Timestamp of the heart rate point'}),
  heartRate: number().openapi({description: 'Heart rate of the heart rate point'}),
}).openapi({ref: 'HeartRatePoint', description: 'Heart rate point'});

export const pathPointValidator = object({
  altitude: number().openapi({description: 'Altitude of the geo data point'}),
  course: number().nullable().openapi({description: 'Course of the geo data point'}),
  speed: number().nullable().openapi({description: 'Speed of the geo data point'}),
  distance: number().nullable().openapi({description: 'Distance of the geo data point'}),
  latitude: number().openapi({description: 'Latitude of the geo data point'}),
  longitude: number().openapi({description: 'Longitude of the geo data point'}),
  horizontalAccuracy: number().nullable().openapi({description: 'Horizontal accuracy of the geo data point'}),
  verticalAccuracy: number().nullable().openapi({description: 'Vertical accuracy of the geo data point'}),
  speedAccuracy: number().nullable().openapi({description: 'Speed accuracy of the geo data point'}),
  timestamp: number().openapi({description: 'Timestamp of the path point'}),
}).strict().openapi({
  ref: 'PathPoint',
  description: 'Path point used to display routes on map for activities such as walking, hiking, etc.',
});

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
}).strict().openapi({ref: 'OutdoorRun', description: 'Outdoor run'});

export const outdoorWalkValidator = outdoorRunValidator.openapi({ref: 'OutdoorWalk', description: 'Outdoor walk'});

export const entryValidator = baseEntryValidator.extend({
  type: nativeEnum(EntryType).openapi({description: 'Entry type', ref: 'Entry Type'}),
  weight: weightValidator.optional().openapi({description: 'Weight. Only for weight entries'}),
  workout: workoutValidator.optional().openapi({description: 'Workout. Only for workout entries.'}),
  image: imageValidator.optional().nullable().openapi({description: 'Image. Only for image entries.'}),
  outdoorRun: outdoorRunValidator.optional().openapi({description: 'Outdoor run. Only for outdoor run entries.'}),
  outdoorWalk: outdoorWalkValidator.optional().openapi({description: 'Outdoor walk. Only for outdoor walk entries.'}),
}).openapi({ref: 'Entry', description: 'Entry. Can be a wirkout entry, a weight entry and so on.'});

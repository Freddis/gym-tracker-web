import {z} from 'zod';
import {argusPhotoValidator} from './ArgusPhoto';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from '../../db';

const numberPair = z.tuple([z.number(), z.number()]);

const pathPoint = z.tuple([
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
]);

const argusRunActivityCheckinDataValidator = z.object({
  id: z.string(),
  user_id: z.union([z.number(), z.string()]),
  client_id: z.string(),
  remoteid: z.string(),
  type: z.string(),
  subtype: z.string(),
  version: z.number().optional(),

  note: z.string().optional(),
  paused: z.boolean().optional(),
  live: z.boolean().optional(), // is workout is still going

  created: z.number(),
  modified: z.number(),
  start: z.number(),
  end: z.number(),
  duration: z.number(),
  activeDuration: z.number().optional(),
  timestamp: z.number(),

  timezone: z.number(),
  privacy: z.number(),
  privacy_groups: z.array(z.string()),

  distance: z.number(),
  speed: z.number().optional(),
  averageSpeed: z.number().optional(),
  maxSpeed: z.number().optional(),
  currentSpeed: z.number().optional(),

  elevationGain: z.number().optional(),

  calories: z.number(),
  met: z.number().optional(),
  goal: z.object({duration: z.number().optional()}).optional(),
  goals: z.object({}).optional(),
  photos: z.array(argusPhotoValidator).optional(),

  path: z.array(pathPoint).optional(),
  pauses: z.array(z.number()).optional(),

  cadence_profile: z.array(numberPair).optional(),
  distance_profile: z.array(numberPair).optional(),
  speed_profile: z.array(numberPair).optional(),

  steps: z.number().optional(),
  currentCadence: z.number().optional(),
  averageCadence: z.number().optional(),
  maxCadence: z.number().optional(),

  averageHeartRate: z.number().optional(),
  maxHeartRate: z.number().optional(),
  currentHeartrate: z.number().optional(),
  heartrate_profile: z.array(numberPair).optional(),

  healthKitSourceName: z.string().optional(), //Aleksey's Apple Watch
  healthKitDevice: z.string().optional(), // id
  healthKitDeviceName: z.string().optional(), // Apple Watch
  healthKitSource: z.string().optional(), // com.apple.health.5B15A526-7780-4C4D-8908-8E678D424901 an specific healthkit app, like fitness
  healthKitAnchor: z.number().optional(), // last sync date
  healthKitAnchors_3_0: z.string().optional(), // last sync anchor

  meta: z.object({
    ip: z.string(),
    client_version: z.string(),
    uuid: z.string(),
  }).optional(),
  place: z.object({
    icon: z.string(),
    name: z.string(),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }).optional(),
  remote_user_id: z.string().optional(),
  userId: z.string().optional(), // same as user_id
  timezone_id: z.string().optional(), // Europe/Moscow
}).strict();

export const argusRunCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Activity}`),
  subtype: z.string(),
  data: argusRunActivityCheckinDataValidator,
});

export type ArgusRunCheckin = z.TypeOf<typeof argusRunCheckinValidator>

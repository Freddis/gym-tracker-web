import {z} from 'zod';
import {argusCheckinDataValidator} from './ArgusCheckinData';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const argusWeatherCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  subtype: z.null(),
  type: z.literal(`${ArgusCheckinType.Weather}`),
  data: argusCheckinDataValidator.extend({
    type: z.literal(`${ArgusCheckinType.Weather}`),
    temperature_current: z.number(),
    temperature_high: z.number(),
    temperature_low: z.number(),
  }),
});

export type ArgusWeatherCheckinValidator = typeof argusWeatherCheckinValidator;
export type ArgusWeatherCheckin = z.TypeOf<ArgusWeatherCheckinValidator>

import {z} from 'zod';
import {entryDataValidator} from './EntryData';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/server/drizzle/db';

export const weatherEntryValidator = createSelectSchema(dbSchema.entries).extend({
  subtype: z.null(),
  type: z.literal(`${EntryType.Weather}`),
  data: entryDataValidator.extend({
    type: z.literal(`${EntryType.Weather}`),
    temperature_current: z.number(),
    temperature_high: z.number(),
    temperature_low: z.number(),
  }),
});

export type WeatherEntryValidator = typeof weatherEntryValidator;
export type WeatherEntry = z.TypeOf<WeatherEntryValidator>

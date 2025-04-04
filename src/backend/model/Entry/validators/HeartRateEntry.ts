import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const heartRateEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Heartrate}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type HeartRateEntryValidator = typeof heartRateEntryValidator;
export type HeartRateEntry = z.TypeOf<HeartRateEntryValidator>

import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const consumedCaloriesEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.ConsumedCalories}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ConsumedCaloriesEntryValidator = typeof consumedCaloriesEntryValidator;
export type ConsumedCaloriesEntry = z.TypeOf<ConsumedCaloriesEntryValidator>

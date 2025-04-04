import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const caloriesEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Calories}`),
  subtype: z.null(),
  data: z.object({
    calories: z.number(),
  }).passthrough(),
});

export type CaloriesEntryValidator = typeof caloriesEntryValidator;
export type CaloriesEntry = z.TypeOf<CaloriesEntryValidator>

import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const foodEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Food}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type FoodEntryValidator = typeof foodEntryValidator;
export type FoodEntry = z.TypeOf<FoodEntryValidator>

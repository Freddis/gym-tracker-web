import {z} from 'zod';
import {EntrySubtype} from '../types/EntrySubtype';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';


export const weightLiftingEntryValidator = createSelectSchema(dbSchema.entries).extend({
  subtype: z.literal(`${EntrySubtype.WheightLifting}`),
  type: z.literal(`${EntryType.Activity}`),
  data: z.unknown(),
});
export type WeightLiftingEntryValidator = typeof weightLiftingEntryValidator;
export type WeightLiftingEntry = z.TypeOf<WeightLiftingEntryValidator>

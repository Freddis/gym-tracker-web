import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const fitnessTestEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.FitnessTest}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type FitnessTestEntryValidator = typeof fitnessTestEntryValidator;
export type FitnessTestEntry = z.TypeOf<FitnessTestEntryValidator>

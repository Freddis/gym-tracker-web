import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const stepsEntryValidator = createSelectSchema(dbSchema.entries).omit({subtype: true}).extend({
  type: z.literal(`${EntryType.Steps}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type StepsEntryValidator = typeof stepsEntryValidator;
export type StepsEntryData = z.TypeOf<StepsEntryValidator>

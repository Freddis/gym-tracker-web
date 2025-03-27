import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/server/drizzle/db';
import {entryDataValidator} from './EntryData';

export const weightEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Weight}`),
  subtype: z.null(),
  data: entryDataValidator.extend({
    type: z.literal(`${EntryType.Weight}`),
    value: z.number(),
  }),
});

export type WeightEntryValidator = typeof weightEntryValidator;
export type WeightEntry = z.TypeOf<WeightEntryValidator>

import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const sleepReportEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Sleepreport}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type SleepReportEntryValidator = typeof sleepReportEntryValidator;
export type SleepReportEntry = z.TypeOf<SleepReportEntryValidator>

import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const bodyMetricsEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Bodymetrics}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type BodyMetricsEntryValidator = typeof bodyMetricsEntryValidator;
export type BodyMetricsEntry = z.TypeOf<BodyMetricsEntryValidator>

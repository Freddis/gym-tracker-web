import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const argusSleepReportCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Sleepreport}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ArgusSleepReportCheckinValidator = typeof argusSleepReportCheckinValidator;
export type ArgusSleepReportCheckin = z.TypeOf<ArgusSleepReportCheckinValidator>

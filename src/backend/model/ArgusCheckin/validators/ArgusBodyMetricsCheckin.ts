import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';

export const argusBodyMetricsCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Bodymetrics}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ArgusBodyMetricsCheckinValidator = typeof argusBodyMetricsCheckinValidator;
export type ArgusBodyMetricsCheckin = z.TypeOf<ArgusBodyMetricsCheckinValidator>

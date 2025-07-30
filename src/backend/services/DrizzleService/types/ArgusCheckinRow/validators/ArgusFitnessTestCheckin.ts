import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';

export const argusFitnessTestCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.FitnessTest}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ArgusFitnessTestCheckinValidator = typeof argusFitnessTestCheckinValidator;
export type ArgusFitnessTestCheckin = z.TypeOf<ArgusFitnessTestCheckinValidator>

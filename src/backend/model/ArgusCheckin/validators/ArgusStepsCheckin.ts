import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';

export const argusStepsCheckinValidator = createSelectSchema(dbSchema.argusCheckins).omit({subtype: true}).extend({
  type: z.literal(`${ArgusCheckinType.Steps}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ArgusStepsCheckinValidator = typeof argusStepsCheckinValidator;
export type ArgusStepsCheckin = z.TypeOf<ArgusStepsCheckinValidator>

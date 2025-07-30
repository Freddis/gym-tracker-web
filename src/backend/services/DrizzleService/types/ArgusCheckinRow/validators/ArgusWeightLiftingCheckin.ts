import {z} from 'zod';
import {ArgusCheckinSubtype} from '../types/ArgusCheckinSubtype';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';


export const argusWeightLiftingCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  subtype: z.literal(`${ArgusCheckinSubtype.WheightLifting}`),
  type: z.literal(`${ArgusCheckinType.Activity}`),
  data: z.unknown(),
});
export type ArgusWeightLiftingCheckinValidator = typeof argusWeightLiftingCheckinValidator;
export type ArgusWeightLiftingCheckin = z.TypeOf<ArgusWeightLiftingCheckinValidator>

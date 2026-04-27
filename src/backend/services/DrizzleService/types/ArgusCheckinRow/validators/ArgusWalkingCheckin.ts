import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {ArgusCheckinSubtype} from '../types/ArgusCheckinSubtype';
import {argusRunActivityCheckinDataValidator, argusRunCheckinValidator} from './ArgusRunCheckin';

export const argusWalkingCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Activity}`),
  subtype: z.literal(`${ArgusCheckinSubtype.Walking}`),
  data: argusRunActivityCheckinDataValidator,
});

export type ArgusWalkingCheckinValidator = typeof argusRunCheckinValidator;
export type ArgusWalkingCheckin = z.TypeOf<ArgusWalkingCheckinValidator>

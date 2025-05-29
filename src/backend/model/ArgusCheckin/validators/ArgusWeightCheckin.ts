import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {argusCheckinDataValidator} from './ArgusCheckinData';

export const argusWeightCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Weight}`),
  subtype: z.null(),
  data: argusCheckinDataValidator.extend({
    type: z.literal(`${ArgusCheckinType.Weight}`),
    value: z.number(),
  }),
});

export type ArgusWeightCheckinValidator = typeof argusWeightCheckinValidator;
export type ArgusWeightCheckin = z.TypeOf<ArgusWeightCheckinValidator>

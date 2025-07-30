import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {ArgusCheckinSubtype} from '../types/ArgusCheckinSubtype';

export const argusDrinkCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Drink}`),
  subtype: z.enum([`${ArgusCheckinSubtype.Coffee}`, `${ArgusCheckinSubtype.Water}`]),
  data: z.unknown(),
});

export type ArgusDrinkCheckinValidator = typeof argusDrinkCheckinValidator;
export type ArgusDrinkCheckin = z.TypeOf<ArgusDrinkCheckinValidator>

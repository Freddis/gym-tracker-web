import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';

export const argusConsumedCaloriesCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.ConsumedCalories}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ArgusConsumedCaloriesCheckinValidator = typeof argusConsumedCaloriesCheckinValidator;
export type ArgusConsumedCaloriesCheckin = z.TypeOf<ArgusConsumedCaloriesCheckinValidator>

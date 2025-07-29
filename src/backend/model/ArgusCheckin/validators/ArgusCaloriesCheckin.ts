import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';

export const argusCaloriesCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Calories}`),
  subtype: z.null(),
  data: z.object({
    calories: z.number(),
  }).passthrough(),
});

export type ArgusCaloriesCheckinValidator = typeof argusCaloriesCheckinValidator;
export type ArgusCaloriesCheckin = z.TypeOf<ArgusCaloriesCheckinValidator>

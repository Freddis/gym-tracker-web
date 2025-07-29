import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';

export const argusFoodCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Food}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ArgusFoodCheckinValidator = typeof argusFoodCheckinValidator;
export type ArgusFoodCheckin = z.TypeOf<ArgusFoodCheckinValidator>

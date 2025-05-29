import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const argusHeartRateCheckinyValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Heartrate}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ArgusHeartRateCheckinyValidator = typeof argusHeartRateCheckinyValidator;
export type ArgusHeartRateCheckin = z.TypeOf<ArgusHeartRateCheckinyValidator>

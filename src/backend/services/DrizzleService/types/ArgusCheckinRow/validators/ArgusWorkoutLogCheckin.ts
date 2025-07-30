import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';

export const argusWorkoutLogCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.WorkoutLog}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type ArgusWorkoutLogCheckinValidator = typeof argusWorkoutLogCheckinValidator;
export type ArgusWorkoutLogCheckin = z.TypeOf<ArgusWorkoutLogCheckinValidator>

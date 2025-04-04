import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const workoutLogEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.WorkoutLog}`),
  subtype: z.null(),
  data: z.unknown(),
});

export type WorkoutLogEntryValidator = typeof workoutLogEntryValidator;
export type WorkoutLogEntry = z.TypeOf<WorkoutLogEntryValidator>

import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';

export const workoutRowValidator = createSelectSchema(dbSchema.workouts).omit({
  externalId: true,
});
export type WorkoutRowValidator = typeof workoutRowValidator
export type WorkoutRow = z.TypeOf<WorkoutRowValidator>

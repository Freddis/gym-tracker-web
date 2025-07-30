import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {TypeOf} from 'zod';

export const workoutRowValidator = createSelectSchema(dbSchema.workouts).omit({
  externalId: true,
});
export type WorkoutRowValidator = typeof workoutRowValidator
export type WorkoutRow = TypeOf<WorkoutRowValidator>

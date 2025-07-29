import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const workoutExerciseRowValidator = createSelectSchema(dbSchema.workoutExercises);
export type WorkoutExerciseRowValidator = typeof workoutExerciseRowValidator;
export type WorkoutExerciseRow = z.TypeOf<WorkoutExerciseRowValidator>

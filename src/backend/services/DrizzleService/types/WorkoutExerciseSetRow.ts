import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const workoutExerciseSetRowValidator = createSelectSchema(dbSchema.workoutExerciseSets);
export type WorkoutExercisSetRowValidator = typeof workoutExerciseSetRowValidator;
export type WorkoutExerciseSetRow = z.TypeOf<WorkoutExercisSetRowValidator>

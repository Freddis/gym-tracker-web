import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {TypeOf} from 'zod';

export const workoutTypeExerciseRowValidator = createSelectSchema(dbSchema.workoutTypeExercises);
export type WorkoutTypeExerciseRowValidator = typeof workoutTypeExerciseRowValidator;
export type WorkoutTypeExerciseRow = TypeOf<WorkoutTypeExerciseRowValidator>;

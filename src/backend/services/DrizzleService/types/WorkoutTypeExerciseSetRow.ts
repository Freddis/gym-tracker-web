import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {TypeOf} from 'zod';

export const workoutTypeExerciseSetRowValidator = createSelectSchema(dbSchema.workoutTypeExerciseSets);
export type WorkoutTypeExerciseSetRowValidator = typeof workoutTypeExerciseSetRowValidator;
export type WorkoutTypeExerciseSetRow = TypeOf<WorkoutTypeExerciseSetRowValidator>;

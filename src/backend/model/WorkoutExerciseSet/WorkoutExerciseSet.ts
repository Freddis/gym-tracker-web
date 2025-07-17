import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';

export const workoutExerciseSetValidator = createSelectSchema(dbSchema.workoutExerciseSets).openapi({ref: 'WorkoutExerciseSet'});
export type WorkoutExercisSetValidator = typeof workoutExerciseSetValidator;
export type WorkoutExerciseSet = z.TypeOf<WorkoutExercisSetValidator>

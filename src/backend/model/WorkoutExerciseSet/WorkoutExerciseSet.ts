import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';

export const workoutExercisSetValidator = createSelectSchema(dbSchema.workoutExerciseSets).openapi({ref: 'WorkoutExerciseSet'});
export type WorkoutExercisSetValidator = typeof workoutExercisSetValidator;
export type WorkoutExerciseSet = z.TypeOf<WorkoutExercisSetValidator>

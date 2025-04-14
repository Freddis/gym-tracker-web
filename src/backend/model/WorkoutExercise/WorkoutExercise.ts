import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';

export const workoutExerciseValidator = createSelectSchema(dbSchema.workoutExercises).openapi({ref: 'WorkoutExercise'});
export type WorkoutExerciseValidator = typeof workoutExerciseValidator;
export type WorkoutExercise = z.TypeOf<WorkoutExerciseValidator>

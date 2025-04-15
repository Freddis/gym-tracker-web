import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';
import {workoutExerciseDecoratedValidator} from '../WorkoutExercise/WorkoutExerciseDecoratedDto';

export const workoutValidator = createSelectSchema(dbSchema.workouts).extend({
  exercises: workoutExerciseDecoratedValidator.array(),
}).openapi({ref: 'Workout'});
export type WorkoutValidator = typeof workoutValidator
export type Workout = z.TypeOf<WorkoutValidator>

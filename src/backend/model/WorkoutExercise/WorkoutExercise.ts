import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';
import {exerciseValidator} from '../Exercise/Exercise';
import {workoutExercisSetValidator} from '../WorkoutExerciseSet/WorkoutExerciseSet';

export const workoutExerciseValidator = createSelectSchema(dbSchema.workoutExercises).extend({
  exercise: exerciseValidator,
  sets: workoutExercisSetValidator.array(),
}).openapi({ref: 'WorkoutExercise'});
export type WorkoutExerciseValidator = typeof workoutExerciseValidator;
export type WorkoutExercise = z.TypeOf<WorkoutExerciseValidator>

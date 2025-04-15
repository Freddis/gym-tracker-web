import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';
import {exerciseValidator} from '../Exercise/Exercise';
import {workoutExercisSetValidator} from '../WorkoutExerciseSet/WorkoutExerciseSet';

export const workoutExerciseDecoratedValidator = createSelectSchema(dbSchema.workoutExercises).extend({
  exercise: exerciseValidator,
  sets: workoutExercisSetValidator.array(),
}).openapi({ref: 'WorkoutExerciseDecorated'});
export type WorkoutExerciseDecoratedValidator = typeof workoutExerciseDecoratedValidator;
export type WorkoutExerciseDecorated = z.TypeOf<WorkoutExerciseDecoratedValidator>

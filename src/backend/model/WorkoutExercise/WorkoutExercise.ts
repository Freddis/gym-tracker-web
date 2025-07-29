import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';
import {exerciseValidator} from '../Exercise/Exercise';
import {workoutExerciseSetValidator} from '../WorkoutExerciseSet/WorkoutExerciseSet';

export const workoutExerciseValidator = createSelectSchema(dbSchema.workoutExercises).extend({
  exercise: exerciseValidator,
  sets: workoutExerciseSetValidator.array(),
}).openapi({ref: 'WorkoutExercise'});
export type WorkoutExerciseValidator = typeof workoutExerciseValidator;
export type WorkoutExercise = z.TypeOf<WorkoutExerciseValidator>

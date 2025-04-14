import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';
import {exerciseValidator} from '../Exercise/Exercise';
import {workoutExercisSetValidator} from '../WorkoutExerciseSet/WorkoutExerciseSet';
import {workoutExerciseValidator} from '../WorkoutExercise/WorkoutExercise';

export const workoutValidator = createSelectSchema(dbSchema.workouts).extend({
  exercises: workoutExerciseValidator.extend({
    exercise: exerciseValidator,
    sets: workoutExercisSetValidator.array(),
  }).array(),
}).openapi({ref: 'Workout'});
export type WorkoutValidator = typeof workoutValidator
export type Workout = z.TypeOf<WorkoutValidator>

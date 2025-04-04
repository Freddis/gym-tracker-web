import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';
import {exerciseValidator} from '../Exercise/Exercise';


export const workoutValidator = createSelectSchema(dbSchema.workouts).extend({
  sets: createSelectSchema(dbSchema.workoutExerciseSets).extend({
    exercise: exerciseValidator,
  }).openapi({ref: 'ExerciseSet'}).array(),
}).openapi({ref: 'Workout'});
export type WorkoutValidator = typeof workoutValidator
export type Workout = z.TypeOf<WorkoutValidator>

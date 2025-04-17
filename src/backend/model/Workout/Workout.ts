import {z} from 'zod';
import {workoutExerciseValidator} from '../WorkoutExercise/WorkoutExercise';
import {workoutRowValidator} from './WorkoutRow';

export const workoutValidator = workoutRowValidator.extend({
  exercises: workoutExerciseValidator.array(),
}).openapi({ref: 'Workout'});
export type WorkoutValidator = typeof workoutValidator
export type Workout = z.TypeOf<WorkoutValidator>

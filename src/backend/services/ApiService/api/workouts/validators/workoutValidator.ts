import {TypeOf} from 'zod';
import {workoutExerciseValidator} from './workoutExerciseValidator';
import {workoutRowValidator} from '../../../../DrizzleService/types/WorkoutRow';

export const workoutValidator = workoutRowValidator.extend({
  exercises: workoutExerciseValidator.array(),
}).openapi({ref: 'Workout'});
export type WorkoutValidator = typeof workoutValidator
export type Workout = TypeOf<WorkoutValidator>

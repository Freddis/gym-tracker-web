import {TypeOf} from 'zod';
import {workoutRowValidator} from '../../../../services/DrizzleService/types/WorkoutRow';
import {workoutExerciseValidator} from './workoutExerciseValidator';

export const workoutValidator = workoutRowValidator.extend({
  exercises: workoutExerciseValidator.array(),
}).openapi({ref: 'Workout'});
export type WorkoutValidator = typeof workoutValidator
export type Workout = TypeOf<WorkoutValidator>

import {number, object} from 'zod';
import {exerciseValidator} from '../../exercises/validators/exerciseValidator';
import {workoutTypeExerciseSetValidator} from './workoutTypeExerciseSetValidator';

export const workoutTypeExerciseValidator = object({
  exercise: exerciseValidator,
  sets: workoutTypeExerciseSetValidator.array().openapi({description: 'Sets'}),
  index: number().openapi({description: 'Position / ordering inside the workout type'}),
}).openapi({
  description: 'Workout Type. Workout template for  that user follows every other day.',
  ref: 'WorkoutTypeExercise',
});

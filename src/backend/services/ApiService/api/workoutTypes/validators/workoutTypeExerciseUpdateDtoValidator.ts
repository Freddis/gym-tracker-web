import {string} from 'zod';
import {workoutTypeExerciseValidator} from './workoutTypeExerciseValidator';

export const workoutTypeExerciseUpdateDtoValidator = workoutTypeExerciseValidator.omit({
  exercise: true,
})
.extend({
  exerciseId: string().openapi({description: 'Id of the exercise'}),
}).openapi({
  description: 'Workout Type. Workout template for  that user follows every other day.',
  ref: 'WorkoutTypeExerciseUpdateDto',
});

import {z} from 'zod';
import {workoutExercisSetValidator} from './WorkoutExerciseSet';

export const workoutExerciseSetUpdateDtoValidator = workoutExercisSetValidator.omit({
  // id: true,
  userId: true,
  workoutId: true,
  workoutExerciseId: true,
  exerciseId: true,
  createdAt: true,
  updatedAt: true,
})
.extend({
  id: z.number().optional(),
}).openapi({ref: 'WorkoutExerciseSetUpdateDto'});
export type WorkoutExerciseSetUpdateDtoValidator = typeof workoutExerciseSetUpdateDtoValidator
export type WorkoutExerciseSetUpdateDto = z.TypeOf<WorkoutExerciseSetUpdateDtoValidator>

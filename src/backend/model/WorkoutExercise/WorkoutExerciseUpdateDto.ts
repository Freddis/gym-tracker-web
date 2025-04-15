import {z} from 'zod';
import {workoutExerciseSetUpdateDtoValidator} from '../WorkoutExerciseSet/WorkoutExerciseSetUpdateDto';
import {workoutExerciseDecoratedValidator} from './WorkoutExerciseDecoratedDto';

export const workoutExerciseUpdateDtoValidator = workoutExerciseDecoratedValidator.omit({
  // id: true,
  workoutId: true,
  userId: true,
  exercise: true,
  createdAt: true,
  updatedAt: true,
})
.extend({
  id: z.number().optional(),
  sets: workoutExerciseSetUpdateDtoValidator.array(),
}).openapi({ref: 'WorkoutExerciseUpdateDto'});
export type WorkoutExerciseUpdateDtoValidator = typeof workoutExerciseUpdateDtoValidator
export type WorkoutExerciseUpdateDto = z.TypeOf<WorkoutExerciseUpdateDtoValidator>

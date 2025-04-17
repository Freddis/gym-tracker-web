import {z} from 'zod';
import {workoutExerciseSetUpdateDtoValidator} from '../WorkoutExerciseSet/WorkoutExerciseSetUpdateDto';
import {workoutExerciseValidator} from './WorkoutExercise';

export const workoutExerciseUpdateDtoValidator = workoutExerciseValidator.omit({
  workoutId: true,
  userId: true,
  exercise: true,
  createdAt: true,
  updatedAt: true,
})
.extend({
  id: z.number().optional(),
  sets: workoutExerciseSetUpdateDtoValidator.array(),
});
export type WorkoutExerciseUpdateDtoValidator = typeof workoutExerciseUpdateDtoValidator
export type WorkoutExerciseUpdateDto = z.TypeOf<WorkoutExerciseUpdateDtoValidator>

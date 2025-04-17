import {z} from 'zod';
import {workoutExercisSetValidator} from './WorkoutExerciseSet';

export const workoutExerciseSetUpsertDtoValidator = workoutExercisSetValidator.omit({
  userId: true,
  workoutId: true,
  workoutExerciseId: true,
  exerciseId: true,
})
.extend({
  id: z.number().optional(),
});
export type WorkoutExerciseSetUpsertDtoValidator = typeof workoutExerciseSetUpsertDtoValidator
export type WorkoutExerciseSetUpsertDto = z.TypeOf<WorkoutExerciseSetUpsertDtoValidator>

import {z} from 'zod';
import {workoutExerciseSetUpsertDtoValidator} from '../WorkoutExerciseSet/WorkoutExerciseSetUpsertDto';
import {workoutExerciseRowValidator} from './WorkoutExerciseRow';

export const workoutExerciseUpsertDtoValidator = workoutExerciseRowValidator.omit({
  workoutId: true,
  userId: true,
})
.extend({
  id: workoutExerciseRowValidator.shape.id.optional(),
  sets: workoutExerciseSetUpsertDtoValidator.array(),
});
export type WorkoutExerciseUpsertDtoValidator = typeof workoutExerciseUpsertDtoValidator
export type WorkoutExerciseUpsertDto = z.TypeOf<WorkoutExerciseUpsertDtoValidator>

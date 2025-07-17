import {z} from 'zod';
import {workoutExerciseSetUpsertDtoValidator} from '../WorkoutExerciseSet/WorkoutExerciseSetUpsertDto';
import {workoutExerciseRowValidator} from './WorkoutExerciseRow';
import {openApi} from '../../utils/openApi';

export const workoutExerciseUpsertDtoValidator = workoutExerciseRowValidator.omit({
  workoutId: true,
  userId: true,
})
.extend({
  id: workoutExerciseRowValidator.shape.id.optional(),
  sets: workoutExerciseSetUpsertDtoValidator.array(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
});
export type WorkoutExerciseUpsertDtoValidator = typeof workoutExerciseUpsertDtoValidator
export type WorkoutExerciseUpsertDto = z.TypeOf<WorkoutExerciseUpsertDtoValidator>

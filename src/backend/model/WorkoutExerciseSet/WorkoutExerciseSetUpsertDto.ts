import {z} from 'zod';
import {workoutExerciseSetValidator} from './WorkoutExerciseSet';
import {openApi} from '../../utils/openApi';

export const workoutExerciseSetUpsertDtoValidator = workoutExerciseSetValidator.omit({
  userId: true,
  workoutId: true,
  workoutExerciseId: true,
  exerciseId: true,
})
.extend({
  id: z.number().optional(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
  end: openApi.validators.strings.datetime.nullable(),
  start: openApi.validators.strings.datetime.nullable(),
});
export type WorkoutExerciseSetUpsertDtoValidator = typeof workoutExerciseSetUpsertDtoValidator
export type WorkoutExerciseSetUpsertDto = z.TypeOf<WorkoutExerciseSetUpsertDtoValidator>

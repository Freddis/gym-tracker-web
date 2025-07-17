import {z} from 'zod';
import {workoutExerciseSetValidator} from './WorkoutExerciseSet';
import {openApi} from '../../utils/openApi';

export const workoutExerciseSetUpdateDtoValidator = workoutExerciseSetValidator.omit({
  userId: true,
  workoutId: true,
  workoutExerciseId: true,
  exerciseId: true,
  createdAt: true,
  updatedAt: true,
})
.extend({
  id: z.number().optional(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
  end: openApi.validators.strings.datetime.nullable(),
  start: openApi.validators.strings.datetime.nullable(),
}).openapi({ref: 'WorkoutExerciseSetUpdateDto'});
export type WorkoutExerciseSetUpdateDtoValidator = typeof workoutExerciseSetUpdateDtoValidator
export type WorkoutExerciseSetUpdateDto = z.TypeOf<WorkoutExerciseSetUpdateDtoValidator>

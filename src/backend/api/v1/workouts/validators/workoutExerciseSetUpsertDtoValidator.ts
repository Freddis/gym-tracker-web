import {z} from 'zod';
import {workoutExerciseSetRowValidator} from '../../../../services/DrizzleService/types/WorkoutExerciseSetRow';
import {openApi} from '../../../../utils/openApi';

export const workoutExerciseSetUpsertDtoValidator = workoutExerciseSetRowValidator.omit({
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

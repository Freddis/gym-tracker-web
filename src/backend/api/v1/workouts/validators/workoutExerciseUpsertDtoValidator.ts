import {openApi} from '../../../../utils/openApi';
import {workoutExerciseSetUpsertDtoValidator} from './workoutExerciseSetUpsertDtoValidator';
import {workoutExerciseValidator} from './workoutExerciseValidator';

export const workoutExerciseUpsertDtoValidator = workoutExerciseValidator.omit({
  workoutId: true,
  userId: true,
  exercise: true,
  id: true,
})
.extend({
  sets: workoutExerciseSetUpsertDtoValidator.array(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
});

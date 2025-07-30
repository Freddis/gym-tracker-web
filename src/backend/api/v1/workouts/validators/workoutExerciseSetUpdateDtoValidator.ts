import {openApi} from '../../../../utils/openApi';
import {workoutExerciseSetValidator} from './workoutExerciseSetValidator';


export const workoutExerciseSetUpdateDtoValidator = workoutExerciseSetValidator.omit({
  userId: true,
  workoutId: true,
  workoutExerciseId: true,
  exerciseId: true,
  createdAt: true,
  updatedAt: true,
  id: true,
})
.extend({
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
  end: openApi.validators.strings.datetime.nullable(),
  start: openApi.validators.strings.datetime.nullable(),
}).openapi({ref: 'WorkoutExerciseSetUpdateDto'});

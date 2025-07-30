import {openApi} from '../../../../utils/openApi';
import {workoutExerciseUpdateDtoValidator} from './workoutExerciseUpdateDtoValidator';
import {workoutValidator} from './workoutValidator';

export const workoutUpdateDtoValidator = workoutValidator.omit({
  userId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  exercises: true,
}).extend({
  exercises: workoutExerciseUpdateDtoValidator.array(),
  start: openApi.validators.strings.datetime,
  end: openApi.validators.strings.datetime.nullable(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
}).openapi({ref: 'WorkoutUpdateDto'});


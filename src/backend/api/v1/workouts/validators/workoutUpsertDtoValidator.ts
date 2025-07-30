import {openApi} from '../../../../utils/openApi';
import {workoutExerciseUpsertDtoValidator} from './workoutExerciseUpsertDtoValidator';
import {workoutValidator} from './workoutValidator';

export const workoutUpsertDtoValidator = workoutValidator.omit({
  userId: true,
  exercises: true,
}).extend({
  id: workoutValidator.shape.id.optional(),
  exercises: workoutExerciseUpsertDtoValidator.array(),
  start: openApi.validators.strings.datetime,
  end: openApi.validators.strings.datetime.nullable(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
}).openapi({ref: 'WorkoutUpsertDto'});



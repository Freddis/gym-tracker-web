

import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseUpsertDtoValidator} from './workoutExerciseUpsertDtoValidator';
import {workoutValidator} from './workoutValidator';

export const workoutUpsertDtoValidator = workoutValidator.omit({
  userId: true,
  exercises: true,
}).extend({
  id: workoutValidator.shape.id.optional(),
  exercises: workoutExerciseUpsertDtoValidator.array(),
  start: RouteFactory.validators.strings.datetime,
  end: RouteFactory.validators.strings.datetime.nullable(),
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
}).openapi({ref: 'WorkoutUpsertDto'});



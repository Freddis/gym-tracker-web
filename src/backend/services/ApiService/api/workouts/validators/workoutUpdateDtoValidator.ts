import {RouteFactory} from '../../../utils/RouteFactory';
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
  start: RouteFactory.validators.strings.datetime,
  end: RouteFactory.validators.strings.datetime.nullable(),
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
}).openapi({ref: 'WorkoutUpdateDto'});


import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseUpdateDtoValidator} from './workoutExerciseUpdateDtoValidator';
import {workoutValidator, workoutValidatorDescriptions} from './workoutValidator';

const validator = workoutValidator.omit({
  userId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  exercises: true,
  deletedAt: true,
}).extend({
  exercises: workoutExerciseUpdateDtoValidator.array(),
  start: RouteFactory.validators.strings.datetime,
  end: RouteFactory.validators.strings.datetime.nullable(),
});

export const workoutUpdateDtoValidator = RouteFactory.validators.describeShape(
  validator,
  workoutValidatorDescriptions
).openapi({ref: 'WorkoutUpdateDto'});

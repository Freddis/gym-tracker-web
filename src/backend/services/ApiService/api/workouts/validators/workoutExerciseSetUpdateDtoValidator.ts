import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetValidator, workoutExerciseSetValidatorDescriptions} from './workoutExerciseSetValidator';

const validator = workoutExerciseSetValidator.omit({
  userId: true,
  workoutId: true,
  workoutExerciseId: true,
  exerciseId: true,
  createdAt: true,
  updatedAt: true,
  id: true,
})
.extend({
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  end: RouteFactory.validators.strings.datetime.nullable(),
  start: RouteFactory.validators.strings.datetime.nullable(),
});

export const workoutExerciseSetUpdateDtoValidator = RouteFactory.validators.describeShape(
validator,
workoutExerciseSetValidatorDescriptions
).openapi({
  ref: 'WorkoutExerciseSetUpdateDto',
});

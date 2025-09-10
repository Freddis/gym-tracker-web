import {workoutExerciseSetRowValidator} from '../../../../DrizzleService/types/WorkoutExerciseSetRow';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetValidatorDescriptions} from './workoutExerciseSetValidator';

const validator = workoutExerciseSetRowValidator.omit({
  userId: true,
  workoutId: true,
  workoutExerciseId: true,
  exerciseId: true,
  createdAt: true,
  updatedAt: true,
  id: true,
})
.extend({
  end: RouteFactory.validators.strings.datetime.nullable(),
  start: RouteFactory.validators.strings.datetime.nullable(),
});

export const workoutExerciseSetUpdateDtoValidator = RouteFactory.validators.describeShape(
validator,
workoutExerciseSetValidatorDescriptions
).openapi({
  ref: 'WorkoutExerciseSetUpdateDto',
});

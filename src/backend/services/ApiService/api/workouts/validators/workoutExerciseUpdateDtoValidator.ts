import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetUpdateDtoValidator} from './workoutExerciseSetUpdateDtoValidator';
import {workoutExerciseValidator, workoutExerciseValidatorDescriptions} from './workoutExerciseValidator';

const validator = workoutExerciseValidator.omit({
  workoutId: true,
  userId: true,
  exercise: true,
  createdAt: true,
  updatedAt: true,
  id: true,
})
.extend({
  sets: workoutExerciseSetUpdateDtoValidator.array(),
});

export const workoutExerciseUpdateDtoValidator = RouteFactory.validators.describeShape(
  validator,
  workoutExerciseValidatorDescriptions,
);

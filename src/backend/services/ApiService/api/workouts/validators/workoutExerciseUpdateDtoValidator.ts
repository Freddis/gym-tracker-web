import {workoutExerciseRowValidator} from '../../../../DrizzleService/types/WorkoutExerciseRow';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetUpdateDtoValidator} from './workoutExerciseSetUpdateDtoValidator';
import {workoutExerciseValidatorDescriptions} from './workoutExerciseValidator';

const validator = workoutExerciseRowValidator.omit({
  workoutId: true,
  userId: true,
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

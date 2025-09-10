import {workoutExerciseRowValidator} from '../../../../DrizzleService/types/WorkoutExerciseRow';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetUpsertDtoValidator} from './workoutExerciseSetUpsertDtoValidator';
import {workoutExerciseValidatorDescriptions} from './workoutExerciseValidator';

const validator = workoutExerciseRowValidator.omit({
  workoutId: true,
  userId: true,
  id: true,
})
.extend({
  sets: workoutExerciseSetUpsertDtoValidator.array(),
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
});

export const workoutExerciseUpsertDtoValidator = RouteFactory.validators.describeShape(
  validator,
  workoutExerciseValidatorDescriptions,
);

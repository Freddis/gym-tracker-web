import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetUpsertDtoValidator} from './workoutExerciseSetUpsertDtoValidator';
import {workoutExerciseValidator, workoutExerciseValidatorDescriptions} from './workoutExerciseValidator';

const validator = workoutExerciseValidator.omit({
  workoutId: true,
  userId: true,
  exercise: true,
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

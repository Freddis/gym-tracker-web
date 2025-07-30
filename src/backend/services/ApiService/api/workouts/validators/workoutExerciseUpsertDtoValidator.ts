import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetUpsertDtoValidator} from './workoutExerciseSetUpsertDtoValidator';
import {workoutExerciseValidator} from './workoutExerciseValidator';

export const workoutExerciseUpsertDtoValidator = workoutExerciseValidator.omit({
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

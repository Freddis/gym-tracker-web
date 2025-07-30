import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetValidator} from './workoutExerciseSetValidator';

export const workoutExerciseSetUpdateDtoValidator = workoutExerciseSetValidator.omit({
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
}).openapi({ref: 'WorkoutExerciseSetUpdateDto'});

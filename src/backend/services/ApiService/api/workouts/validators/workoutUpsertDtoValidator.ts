import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseUpsertDtoValidator} from './workoutExerciseUpsertDtoValidator';
import {workoutValidator, workoutValidatorDescriptions} from './workoutValidator';

const validator = workoutValidator.omit({
  userId: true,
  exercises: true,
}).extend({
  id: workoutValidator.shape.id.optional(),
  exercises: workoutExerciseUpsertDtoValidator.array(),
  start: RouteFactory.validators.strings.datetime,
  end: RouteFactory.validators.strings.datetime.nullable(),
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
});
export const workoutUpsertDtoValidator = RouteFactory.validators.describeShape(
  validator,
  workoutValidatorDescriptions
).openapi({
  ref: 'WorkoutUpsertDto',
  description: 'Fields needed to update a workout',
});



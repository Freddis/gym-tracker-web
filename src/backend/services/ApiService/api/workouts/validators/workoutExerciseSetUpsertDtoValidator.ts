import {number} from 'zod';
import {workoutExerciseSetRowValidator} from '../../../../DrizzleService/types/WorkoutExerciseSetRow';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutExerciseSetValidatorDescriptions} from './workoutExerciseSetValidator';

const validator = workoutExerciseSetRowValidator.omit({
  userId: true,
  workoutId: true,
  workoutExerciseId: true,
  exerciseId: true,
})
.extend({
  id: number().optional(),
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  end: RouteFactory.validators.strings.datetime.nullable(),
  start: RouteFactory.validators.strings.datetime.nullable(),
});

export const workoutExerciseSetUpsertDtoValidator = RouteFactory.validators.describeShape(
  validator,
  workoutExerciseSetValidatorDescriptions
);

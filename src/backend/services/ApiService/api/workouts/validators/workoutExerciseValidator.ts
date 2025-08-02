import {WorkoutExercise} from '../../../../../../frontend/utils/openapi-client';
import {workoutExerciseRowValidator} from '../../../../DrizzleService/types/WorkoutExerciseRow';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';
import {exerciseValidator} from '../../exercises/validators/exerciseValidator';
import {workoutExerciseSetValidator} from './workoutExerciseSetValidator';

export const workoutExerciseValidatorDescriptions: OpenApiDescriptions<WorkoutExercise> = {
  id: 'Id of the workout exercise',
  userId: 'Id of the user',
  createdAt: 'The date the workout excercise was created',
  updatedAt: 'The last time  the workout excercise was updated',
  workoutId: 'Id of the workout',
  exerciseId: 'Id of the exercise',
  exercise: 'Library excercise',
  sets: 'List of sets performed for this excercise',
};
const validator = workoutExerciseRowValidator.extend({
  exercise: exerciseValidator,
  sets: workoutExerciseSetValidator.array(),
});

export const workoutExerciseValidator = RouteFactory.validators.describeShape(
  validator,
  workoutExerciseValidatorDescriptions
).openapi({
  ref: 'WorkoutExercise',
  description: 'Excercise performed during workout. Not to be confused with Excercise.',
});

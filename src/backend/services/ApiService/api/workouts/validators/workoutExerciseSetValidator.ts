import {workoutExerciseSetRowValidator} from '../../../../DrizzleService/types/WorkoutExerciseSetRow';
import {WorkoutExerciseSet} from '../../../../WorkoutService/types/WorkoutExerciseSet';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';

export const workoutExerciseSetValidatorDescriptions: OpenApiDescriptions<WorkoutExerciseSet> = {
  id: 'Id of the set',
  userId: 'User that performed this set',
  createdAt: 'The date set was created',
  updatedAt: 'The date set was last time updated',
  exerciseId: 'Id of the excercise performed',
  start: 'The time when set started',
  end: 'The time set ended.',
  workoutId: 'Id of the workout',
  workoutExerciseId: 'Id of the Workout Excercise. ',
  weight: 'Weight in lifted in units that user is using',
  reps: 'Number of repetitions',
};
export const workoutExerciseSetValidator = RouteFactory.validators.describeShape(
  workoutExerciseSetRowValidator,
  workoutExerciseSetValidatorDescriptions
).openapi({
  ref: 'WorkoutExerciseSet',
  description: 'Set is a group of repetitionss performed back to back one after',
});

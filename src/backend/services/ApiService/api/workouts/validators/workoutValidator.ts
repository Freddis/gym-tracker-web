import {TypeOf} from 'zod';
import {workoutExerciseValidator} from './workoutExerciseValidator';
import {workoutRowValidator} from '../../../../DrizzleService/types/WorkoutRow';
import {RouteFactory} from '../../../utils/RouteFactory';

export const workoutValidatorDescriptions: Record<keyof typeof validator.shape, string> = {
  id: 'Id of the workout',
  typeId: 'Id of the workout type. Users can create their own workout types as templates for workouts.',
  userId: 'Id of the user that created this workout',
  calories: 'Calories burned during workout',
  start: 'Time when workout started',
  end: 'Time when workout finished',
  createdAt: 'Time when the workout was created. Not changeable by user',
  updatedAt: 'The last time the workout was updated',
  deletedAt: 'The time workout has been deleted. Users cannot access deleted workouts',
  exercises: 'List of the performed exercises',
};

const validator = workoutRowValidator.extend({
  exercises: workoutExerciseValidator.array(),
});

export const workoutValidator = RouteFactory.validators.describeShape(
  validator,
  workoutValidatorDescriptions
).openapi({ref: 'Workout', description: 'Gym Workout. Consists of performed excercises and sets.'});
export type WorkoutValidator = typeof workoutValidator
export type Workout = TypeOf<WorkoutValidator>

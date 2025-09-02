import {workoutTypeRowValidator} from '../../../../DrizzleService/types/WorkoutTypeRow';
import {WorkoutType} from '../../../../WorkoutTypeService/types/WorkoutType';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutTypeExerciseValidator} from './workoutTypeExerciseValidator';

const descripton: OpenApiDescriptions<WorkoutType> = {
  id: 'Id',
  name: 'Name of the workout type',
  description: 'Description of the workpout type',
  createdAt: 'Date of creation',
  updatedAt: 'The last time workout type was updated',
  userId: 'Id of the user',
  deletedAt: 'Date workout type was deleted',
  planId: 'Position inside Workout Plan',
  planIndex: 'Workout Plan Id',
  exercises: 'Exercises',
};
const validator = workoutTypeRowValidator.extend({
  exercises: workoutTypeExerciseValidator.array(),
});

export const workoutTypeValidator = RouteFactory.validators.describeShape(validator, descripton).openapi({
  description: 'Workout Type. Workout template for  that user follows every other day.',
  ref: 'WorkoutType',
});

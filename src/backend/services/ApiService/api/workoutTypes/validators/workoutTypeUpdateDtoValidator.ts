import {workoutTypeRowValidator} from '../../../../DrizzleService/types/WorkoutTypeRow';
import {WorkoutTypeUpdateDto} from '../../../../WorkoutTypeService/types/WorkoutTypeUpdateDto';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutTypeExerciseUpdateDtoValidator} from './workoutTypeExerciseUpdateDtoValidator';

const descripton: OpenApiDescriptions<WorkoutTypeUpdateDto> = {
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
  exercises: workoutTypeExerciseUpdateDtoValidator.array(),
});

export const workoutTypeUpdateDtoValidator = RouteFactory.validators.describeShape(validator, descripton).openapi({
  description: 'Workout Type.',
  ref: 'WorkoutTypeUpdateDto',
});

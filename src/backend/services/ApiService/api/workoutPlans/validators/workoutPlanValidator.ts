import {workoutPlanRowValidator} from '../../../../DrizzleService/types/WorkoutPlanRow';
import {WorkoutPlan} from '../../../../WorkoutPlanService/types/WorkoutPlan';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';

const descripton: OpenApiDescriptions<WorkoutPlan> = {
  id: 'Id',
  name: 'Name of the workout plan',
  description: 'Description of the workpout plan',
  createdAt: 'Date of creation',
  updatedAt: 'The last time workout plan was updated',
  userId: 'Id of the user',
  deletedAt: 'Date workout plan was deleted',
};
const validator = workoutPlanRowValidator;

export const workoutPlanValidator = RouteFactory.validators.describeShape(validator, descripton).openapi({
  description: 'Workout Plan. Consist of workout templates that users supposed to conduct.',
  ref: 'WorkoutPlan',
});

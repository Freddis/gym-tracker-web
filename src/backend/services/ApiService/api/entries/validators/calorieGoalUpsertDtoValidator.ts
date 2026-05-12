import {RouteFactory} from '../../../utils/RouteFactory';
import {calorieGoalValidator} from './calorieGoalValidator';

export const calorieGoalUpsertDtoValidator = calorieGoalValidator.extend({
  start: RouteFactory.validators.strings.datetime.openapi({description: 'Start date of the calorie goal'}),
  end: RouteFactory.validators.strings.datetime.nullable().openapi({description: 'End date of the calorie goal'}),
}).openapi({
  ref: 'CalorieGoalUpsertDto',
  description: 'Calorie goal record to upsert',
});

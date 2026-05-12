import {foodComponentDtoValidator} from '../../food/validators/foodUpsertDtoValidator';
import {mealValidator} from './mealValidator';

export const mealUpsertDtoValidator = mealValidator.extend({
  food: foodComponentDtoValidator.array().openapi({description: 'Components of the meal'}),
}).openapi({ref: 'MealUpsertDto', description: 'Meal record to upsert'});

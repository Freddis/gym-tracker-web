import {nativeEnum, number, object} from 'zod';
import {MealType} from '../../../../MealService/types/MealType';
import {foodAmountUnitValidator} from '../../food/validators/foodAmountUnitValidator';
import {foodValidator} from '../../food/validators/foodValidator';

const mealTypeValidator = nativeEnum(MealType).openapi({ref: 'MealType', description: 'Type of the meal'});

const mealFoodComponentValidator = object({
  food: foodValidator.openapi({description: 'Food of the meal component'}),
  amount: number().openapi({description: 'Amount of the meal component'}),
  unit: foodAmountUnitValidator.openapi({description: 'Unit of the meal component'}),
}).openapi({ref: 'MealFoodComponent', description: 'Meal food component'});

export const mealValidator = object({
  type: mealTypeValidator.openapi({description: 'Type of the meal'}),
  food: mealFoodComponentValidator.array().openapi({description: 'Food components of the meal'}),
}).openapi({ref: 'Meal', description: 'Meal record. Tracks consumed calories.'});

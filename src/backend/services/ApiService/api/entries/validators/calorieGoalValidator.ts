import {object, number, date} from 'zod';

export const calorieGoalValidator = object({
  calories: number().openapi({description: 'Calories of the calorie goal'}),
  carbs: number().nullable().openapi({description: 'Carbs of the calorie goal'}),
  protein: number().nullable().openapi({description: 'Protein of the calorie goal'}),
  fat: number().nullable().openapi({description: 'Fat of the calorie goal'}),
  start: date().openapi({description: 'Start date of the calorie goal'}),
  end: date().nullable().openapi({description: 'End date of the calorie goal'}),
}).openapi({ref: 'CalorieGoal', description: 'Calorie goal record'});

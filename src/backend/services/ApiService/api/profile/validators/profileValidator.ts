import {object, array, string, number, nativeEnum, date} from 'zod';
import {calorieGoalValidator} from '../../entries/validators/calorieGoalValidator';
import {genderValidator} from '../../settings/validators/genderValidator';
import {userValidator} from '../../users/validators/userValidator';
import {unitsValidator} from '../../settings/validators/unitsValidator';
import {GoalType} from '../../../ProfileService/types/GoalType';

const goalTypeValidator = nativeEnum(GoalType).openapi({ref: 'GoalType', description: 'Type of the goal'});
const weightGoalValidator = object({
  target: number().openapi({description: 'Target weight of the goal'}),
}).openapi({ref: 'WeightGoal', description: 'Weight goal record'});

const consumedCaloriesHistoryValidator = object({
  data: object({
    date: date().openapi({description: 'Date of the consumed calories'}),
    value: number().openapi({description: 'Calories consumed on the date'}),
  }).array().openapi({description: 'History records'}),
  size: number().openapi({description: 'Size of the history in days'}),
}).openapi({ref: 'ConsumedCaloriesHistory', description: 'Consumed calories history'});

const consumedCaloriesValidator = object({
  calories: number().openapi({description: 'Calories consumed today'}),
  carbs: number().openapi({description: 'Carbs consumed today'}),
  protein: number().openapi({description: 'Protein consumed today'}),
  fat: number().openapi({description: 'Fat consumed today'}),
}).openapi({ref: 'ConsumedCalories', description: 'Consumed calories'});

const goalValidator = object({
  type: goalTypeValidator,
  calorie: calorieGoalValidator.optional().openapi({description: 'Calorie goal of the user'}),
  weight: weightGoalValidator.optional().openapi({description: 'Weight goal of the user'}),
}).openapi({ref: 'Goal', description: 'Goal of the user'});

export const profileValidator = object({
  user: userValidator,
  goals: array(goalValidator).openapi({description: 'List of calorie goals'}),
  note: string().nullable().openapi({description: 'Note of the user'}),
  height: number().openapi({description: 'Height of the user'}),
  weight: number().nullable().openapi({description: 'Weight of the user'}),
  age: number().openapi({description: 'Age of the user'}),
  gender: genderValidator,
  units: unitsValidator,
  consumedCalories: consumedCaloriesValidator,
  consumedCaloriesHistory: consumedCaloriesHistoryValidator,
}).openapi({ref: 'Profile', description: 'Profile of the user'});

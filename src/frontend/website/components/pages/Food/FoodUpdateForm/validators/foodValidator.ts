import {number} from 'zod';
import {baseFoodValidator} from './baseFoodValidator';

export const foodValidator = baseFoodValidator.extend({
  protein: number().min(0),
  carbs: number().min(0),
  fat: number().min(0),
  servingSize: number().min(0).positive().nullable(),
});

import {nativeEnum} from 'zod';
import {FoodAmountUnit} from '../../../../FoodService/types/FoodAmountUnit';

export const foodAmountUnitValidator = nativeEnum(FoodAmountUnit).openapi({
  ref: 'FoodAmountUnit',
  description: 'Unit in which the food is measured',
});

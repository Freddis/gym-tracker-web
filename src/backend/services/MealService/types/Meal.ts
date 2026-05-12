import {FoodComponent} from '../../FoodService/types/FoodComponent';
import {MealType} from './MealType';

export interface Meal {
  id: number
  type: MealType
  food: FoodComponent[];
}

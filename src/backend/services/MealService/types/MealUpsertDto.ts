import {FoodComponentUpsertDto} from '../../FoodService/types/FoodComponentUpsertDto';
import {Meal} from './Meal';

export interface MealUpsertDto extends Omit<Meal, 'food' | 'id'> {
  food: FoodComponentUpsertDto[];
}

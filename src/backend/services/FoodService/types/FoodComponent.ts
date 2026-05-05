import {Food} from './Food';
import {FoodAmountUnit} from './FoodAmountUnit';

export interface FoodComponent {
  amount: number;
  unit: FoodAmountUnit;
  food: Food;
}

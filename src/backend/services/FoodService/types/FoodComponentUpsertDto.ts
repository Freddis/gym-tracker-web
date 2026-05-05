import {FoodAmountUnit} from './FoodAmountUnit';

export interface FoodComponentUpsertDto {
  food: {
    id: string;
  };
  amount: number;
  unit: FoodAmountUnit;
}

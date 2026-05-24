import {IFood} from './IFood';

export interface IFoodComponent {
  amount: number;
  unit: 'Gram' | 'Serving';
  food: IFood;
}

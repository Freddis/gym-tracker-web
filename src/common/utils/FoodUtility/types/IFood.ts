import {IFoodComponent} from './IFoodComponent';

export interface IFood {
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number | null;
  isMeal: boolean;
  components: IFoodComponent[];
}

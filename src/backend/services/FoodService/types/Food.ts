import {Image} from '../../ImageService/types/Image';
import {FoodComponent} from './FoodComponent';
import {ServingSizeUnit} from './ServingSizeUnit';

export interface Food {
  id: string;
  name: string;
  description: string | null;
  image: Image | null;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isMeal: boolean;
  servingSize: number | null;
  servingSizeUnit: ServingSizeUnit;
  components: FoodComponent[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

import {Image} from '../../ImageService/types/Image';

export interface Food {
  id: string;
  name: string;
  description: string | null;
  image: Image | null;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number | null;
  servingSizeUnit: string;
  components: Food[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

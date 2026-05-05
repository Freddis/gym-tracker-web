import {ImageUpsertDto} from '../../EntryService/types/EntryUpsertDto';
import {FoodComponentUpsertDto} from './FoodComponentUpsertDto';
import {ServingSizeUnit} from './ServingSizeUnit';
export interface FoodUpsertDto {
  id: string;
  name: string;
  description: string | null;
  image?: ImageUpsertDto | null;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number | null;
  servingSizeUnit: ServingSizeUnit;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isMeal: boolean;
  components: FoodComponentUpsertDto[];
}

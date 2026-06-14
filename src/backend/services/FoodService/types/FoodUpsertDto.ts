import {ImageUpsertDto} from '../../EntryService/types/EntryUpsertDto';
import {EntryVisibility} from '../../EntryService/types/EntryVisibility';
import {FoodComponentUpsertDto} from './FoodComponentUpsertDto';
import {ServingSizeUnit} from './ServingSizeUnit';
export interface FoodUpsertDto {
  id: string;
  name: string;
  brand: string | null;
  description: string | null;
  image?: ImageUpsertDto | null;
  calories: number | null;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number | null;
  servingSizeUnit: ServingSizeUnit;
  visibility: EntryVisibility;
  barcode: number | null;
  copiedFromId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isMeal: boolean;
  components: FoodComponentUpsertDto[];
}

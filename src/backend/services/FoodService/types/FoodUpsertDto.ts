import {ImageUpsertDto} from '../../EntryService/types/EntryUpsertDto';

export interface FoodUpsertDto {
  id: string;
  name: string;
  description: string | null;
  image?: ImageUpsertDto | null;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number | null;
  servingSizeUnit: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

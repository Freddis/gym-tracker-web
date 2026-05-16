import {Filter} from '../../../types/ModelService/types/Filter';

export interface FoodFilter extends Filter<string> {
  search?: string;
  isDish?:boolean;
  updatedAfter?: Date;
  includeDeleted?: boolean;
}

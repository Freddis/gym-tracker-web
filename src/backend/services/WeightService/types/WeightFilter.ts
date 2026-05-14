import {Filter} from '../../../types/ModelService/types/Filter';

export interface WeightFilter extends Filter<number> {
  userId?: number;
}

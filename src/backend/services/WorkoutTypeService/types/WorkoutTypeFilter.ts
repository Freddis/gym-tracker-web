import {Filter} from '../../../types/ModelService/types/Filter';

export interface WorkoutTypeFilter extends Filter<string> {
  updatedAfter?: Date
}

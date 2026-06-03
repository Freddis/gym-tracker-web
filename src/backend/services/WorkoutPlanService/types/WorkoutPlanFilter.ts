import {Filter} from '../../../types/ModelService/types/Filter';

export interface WorkoutPlanFilter extends Filter<string> {
  updatedAfter?: Date,
}

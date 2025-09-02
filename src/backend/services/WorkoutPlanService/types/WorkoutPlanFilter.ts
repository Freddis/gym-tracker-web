import {Filter} from '../../../types/ModelService/Filter';

export interface WorkoutPlanFilter extends Filter {
  updatedAfter?: Date,
}

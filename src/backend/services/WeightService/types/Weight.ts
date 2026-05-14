import {WeightRow} from '../../DrizzleService/types/WeightRow';

export interface Weight extends WeightRow {
  history: WeightRow[]
  historySize: number
}

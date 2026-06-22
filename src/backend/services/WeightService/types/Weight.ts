import {WeightRow} from '../../DrizzleService/types/WeightRow';
import {WeightHistoryRow} from './WeightHistoryRow';

export interface Weight extends WeightRow {
  history: WeightHistoryRow[]
  historySize: number
}

import {StrictOmit} from '../../../types/StrictOmit';
import {Weight} from './Weight';

export interface WeightUpsertDto extends StrictOmit<Weight, 'id'| 'userId'| 'externalId'| 'history'| 'historySize'> {
  id?: number
}

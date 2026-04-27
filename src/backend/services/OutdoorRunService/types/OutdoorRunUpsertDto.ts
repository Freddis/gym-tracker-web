import {StrictOmit} from '../../../types/StrictOmit';
import {OutdoorRun} from './OutdoorRun';

export interface OutdoorRunUpsertDto extends StrictOmit<OutdoorRun, 'id' | 'userId'> {
  id?: number
}

import {StrictOmit} from '../../../types/StrictOmit';
import {OutdoorWalk} from './OutdoorWalk';

export interface OutdoorWalkUpsertDto extends StrictOmit<OutdoorWalk, 'id' | 'userId'> {
  id?: number
}

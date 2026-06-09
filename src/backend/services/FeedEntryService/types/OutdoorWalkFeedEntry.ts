import {StrictOmit} from '../../../types/StrictOmit';
import {OutdoorWalkEntry} from '../../EntryService/types/Entry';
import {ReducedOutdoorWalk} from '../services/ReducedOutdoorWalkService/types/ReducedOutdoorWalk';

export interface OutdoorWalkFeedEntry extends StrictOmit<OutdoorWalkEntry, 'outdoorWalk'> {
  outdoorWalk: ReducedOutdoorWalk;
}

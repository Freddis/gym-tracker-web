import {StrictOmit} from '../../../types/StrictOmit';
import {OutdoorRunEntry} from '../../EntryService/types/Entry';
import {ReducedOutdoorRun} from '../services/ReducedOutdoorRunService/types/ReducedOutdoorRun';

export interface OutdoorRunFeedEntry extends StrictOmit<OutdoorRunEntry, 'outdoorRun'> {
  outdoorRun: ReducedOutdoorRun;
}

import {StrictOmit} from '../../../../../types/StrictOmit';
import {OutdoorWalk} from '../../../../OutdoorWalkService/types/OutdoorWalk';

export type ReducedOutdoorWalk = StrictOmit<OutdoorWalk, 'geoData' | 'heartRateData'>;

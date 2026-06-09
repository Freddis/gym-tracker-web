import {StrictOmit} from '../../../../../types/StrictOmit';
import {OutdoorRun} from '../../../../OutdoorRunService/types/OutdoorRun';

export type ReducedOutdoorRun = StrictOmit<OutdoorRun, 'geoData' | 'heartRateData'>;

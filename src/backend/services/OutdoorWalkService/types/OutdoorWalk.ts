
import {HeartRatePoint} from './HeartRatePoint';
import {PathPoint} from './PathPoint';

export interface OutdoorWalk {
  id: number;
  userId: number;
  distance: number;
  elevationGain: number | null;
  duration: number;
  calories: number;
  pace: number;
  cadence: number | null;
  maxPace: number;
  maxCadence: number | null;
  heartRate: number | null;
  maxHeartRate: number | null;
  start: Date;
  end: Date;
  geoData: PathPoint[] | null;
  heartRateData: HeartRatePoint[] | null;
}

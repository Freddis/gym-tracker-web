import {OutdoorRun} from '../../OutdoorRunService/types/OutdoorRun';
import {OutdoorWalk} from '../../OutdoorWalkService/types/OutdoorWalk';
import {Weight} from '../../WeightService/types/Weight';
import {Workout} from '../../WorkoutService/types/Workout';
import {EntryType} from './EntryType';

export type EntryObjectMap = Record<EntryType, unknown> & {
  [EntryType.Weight]: Weight;
  [EntryType.Workout]: Workout;
  [EntryType.Post]: null;
  [EntryType.OutdoorRun]: OutdoorRun;
  [EntryType.OutdoorWalk]: OutdoorWalk;
}

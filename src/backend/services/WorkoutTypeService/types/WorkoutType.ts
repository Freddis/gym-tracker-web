import {WorkoutTypeRow} from '../../DrizzleService/types/WorkoutTypeRow';
import {WorkoutTypeExercise} from './WorkoutTypeExercise';

export interface WorkoutType extends WorkoutTypeRow {
  exercises: WorkoutTypeExercise[]
}

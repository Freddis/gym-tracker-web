import {WorkoutExercise} from './WorkoutExercise';
import {WorkoutRow} from '../../DrizzleService/types/WorkoutRow';

export interface Workout extends WorkoutRow {
  exercises: WorkoutExercise[]
}

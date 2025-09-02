import {WorkoutTypeRow} from '../../DrizzleService/types/WorkoutTypeRow';
import {WorkoutTypeExercise} from './WorkoutTypeExercise';

export interface WorkoutTypeUpdateDto extends WorkoutTypeRow {
  exercises: (Omit<WorkoutTypeExercise, 'exercise'> & {exerciseId: number})[]
}

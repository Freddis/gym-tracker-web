import {WorkoutExerciseSet} from './WorkoutExerciseSet';
import {Exercise} from '../../ExerciseService/types/Exercise';
import {WorkoutExerciseRow} from '../../DrizzleService/types/WorkoutExerciseRow';

export interface WorkoutExercise extends WorkoutExerciseRow {
  exercise: Exercise
  sets: WorkoutExerciseSet[]
}

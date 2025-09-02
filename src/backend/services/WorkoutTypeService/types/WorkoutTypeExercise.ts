import {Exercise} from '../../ExerciseService/types/Exercise';
import {WorkoutTypeExerciseSet} from './WorkoutTypeExerciseSet';

export interface WorkoutTypeExercise {
    exercise: Exercise
    index: number,
    sets: WorkoutTypeExerciseSet[]
  }

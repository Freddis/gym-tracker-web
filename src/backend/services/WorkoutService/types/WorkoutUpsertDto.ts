import {StrictOmit} from '../../../types/StrictOmit';
import {Workout} from './Workout';
import {WorkoutExercise} from './WorkoutExercise';
import {WorkoutExerciseSet} from './WorkoutExerciseSet';

export interface WorkoutUpsertDto extends StrictOmit<Workout, 'exercises'|'userId'| 'id'> {
  id?: number
  exercises: (StrictOmit<WorkoutExercise, 'userId'| 'workoutId'|'exercise'|'sets'|'id'> & {
    sets: StrictOmit<WorkoutExerciseSet, |'userId' |'workoutId'| 'exerciseId'| 'workoutExerciseId'|'id'>[]
  })[]
}

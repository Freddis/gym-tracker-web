import {StictOmit} from '../../../../common/types/StrictOmit';
import {Workout} from './Workout';
import {WorkoutExercise} from './WorkoutExercise';
import {WorkoutExerciseSet} from './WorkoutExerciseSet';

export interface WorkoutUpsertDto extends StictOmit<Workout, 'exercises'|'userId'| 'id'> {
  id?: number
  exercises: (StictOmit<WorkoutExercise, 'userId'| 'workoutId'|'exercise'|'sets'|'id'> & {
    sets: StictOmit<WorkoutExerciseSet, |'userId' |'workoutId'| 'exerciseId'| 'workoutExerciseId'|'id'>[]
  })[]
}

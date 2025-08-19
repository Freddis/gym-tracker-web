import {StictOmit} from '../../../types/StrictOmit';
import {Workout} from './Workout';
import {WorkoutExercise} from './WorkoutExercise';
import {WorkoutExerciseSet} from './WorkoutExerciseSet';

export interface WorkoutUpdateDto extends StictOmit<Workout, 'id'|'exercises'|'userId'> {
  exercises: (StictOmit<WorkoutExercise, 'id'|'createdAt'| 'updatedAt'| 'userId'| 'workoutId'|'exercise'|'sets'> & {
    sets: StictOmit<WorkoutExerciseSet, 'id'|'userId' |'workoutId'| 'exerciseId'| 'workoutExerciseId'>[]
  })[]
}

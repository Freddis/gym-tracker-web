import {Workout} from './Workout';
import {WorkoutExercise} from './WorkoutExercise';
import {WorkoutExerciseSet} from './WorkoutExerciseSet';

type StictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface WorkoutUpdateDto extends StictOmit<Workout, 'id'|'exercises'|'userId'> {
  exercises: (StictOmit<WorkoutExercise, 'id'|'createdAt'| 'updatedAt'| 'userId'| 'workoutId'|'exercise'|'sets'> & {
    sets: StictOmit<WorkoutExerciseSet, 'id'|'userId' |'workoutId'| 'exerciseId'| 'workoutExerciseId'>[]
  })[]
}

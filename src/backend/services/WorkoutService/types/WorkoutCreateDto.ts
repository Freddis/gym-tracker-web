import {StrictOmit} from '../../../types/StrictOmit';
import {Workout} from './Workout';
import {WorkoutExercise} from './WorkoutExercise';
import {WorkoutExerciseSet} from './WorkoutExerciseSet';

export interface WorkoutCreateDto extends StrictOmit<Workout, 'id'|'exercises'|'createdAt'| 'updatedAt'|'deletedAt'|'userId'> {
  exercises: (StrictOmit<WorkoutExercise, 'id'|'createdAt'| 'updatedAt'| 'userId'| 'workoutId'|'exercise'|'sets'> & {
    sets: StrictOmit<WorkoutExerciseSet, 'id'|'userId' |'workoutId'| 'exerciseId'| 'workoutExerciseId'|'createdAt'|'updatedAt'>[]
  })[]
}

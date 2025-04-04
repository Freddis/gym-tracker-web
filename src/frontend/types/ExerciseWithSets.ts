import {Exercise, ExerciseSet} from '../openapi-client';

export type ExerciseWithSets = {
  exercise: Exercise,
  sets: ExerciseSet[]
}

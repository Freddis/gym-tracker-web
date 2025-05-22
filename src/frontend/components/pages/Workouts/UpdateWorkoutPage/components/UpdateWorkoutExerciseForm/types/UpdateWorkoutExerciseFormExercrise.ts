import {Exercise, WorkoutUpsertDto} from 'src/frontend/openapi-client';

export interface UpdateWorkoutExerciseFormExercrise {
  exercise: Exercise,
  workoutExercise: WorkoutUpsertDto['exercises'][0]
}

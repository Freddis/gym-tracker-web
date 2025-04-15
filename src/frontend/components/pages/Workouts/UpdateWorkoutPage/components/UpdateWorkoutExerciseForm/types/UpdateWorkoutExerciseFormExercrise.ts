import {Exercise, WorkoutExerciseUpdateDto} from 'src/frontend/openapi-client';

export interface UpdateWorkoutExerciseFormExercrise {
  exercise: Exercise,
  workoutExercise: WorkoutExerciseUpdateDto
}

import {Exercise, WorkoutUpdateDto} from 'src/frontend/openapi-client';
import {StictOmit} from '../../../../../../../../common/types/StrictOmit';

export interface UpdateWorkoutExerciseFormExercrise {
  exercise: StictOmit<Exercise, 'muscles'|'variations'>,
  workoutExercise: WorkoutUpdateDto['exercises'][0]
}

import {StictOmit} from '../../../../../../../../common/types/StrictOmit';
import {Exercise, WorkoutUpdateDto} from '../../../../../../../utils/openapi-client';

export interface UpdateWorkoutExerciseFormExercrise {
  exercise: StictOmit<Exercise, 'muscles'|'variations'>,
  workoutExercise: WorkoutUpdateDto['exercises'][0]
}

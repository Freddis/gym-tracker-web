import {WorkoutUpdateDto} from 'src/frontend/openapi-client';
import {UpdateWorkoutExerciseFormExercrise} from './UpdateWorkoutExerciseFormExercrise';
export interface UpdateWorkoutExerciseFormProps {
  item: UpdateWorkoutExerciseFormExercrise,
  onDelete: (item: WorkoutUpdateDto['exercises'][0])=> void
}

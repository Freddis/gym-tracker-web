import {WorkoutExerciseUpdateDto} from 'src/frontend/openapi-client';
import {UpdateWorkoutExerciseFormExercrise} from './UpdateWorkoutExerciseFormExercrise';
export interface UpdateWorkoutExerciseFormProps {
  item: UpdateWorkoutExerciseFormExercrise,
  onDelete: (item: WorkoutExerciseUpdateDto)=> void
}

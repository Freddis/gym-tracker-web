import {WorkoutUpsertDto} from 'src/frontend/openapi-client';
import {UpdateWorkoutExerciseFormExercrise} from './UpdateWorkoutExerciseFormExercrise';
export interface UpdateWorkoutExerciseFormProps {
  item: UpdateWorkoutExerciseFormExercrise,
  onDelete: (item: WorkoutUpsertDto['exercises'][0])=> void
}

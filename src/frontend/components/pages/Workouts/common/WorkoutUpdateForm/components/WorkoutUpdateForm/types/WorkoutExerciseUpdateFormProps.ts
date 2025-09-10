import {WorkoutExercise} from '../../../../../../../../utils/openapi-client';
export interface WorkoutExerciseUpdateFormProps {
  item: WorkoutExercise,
  onDelete: (item: WorkoutExercise)=> void
  onUpdate: (set: WorkoutExercise) => void
}

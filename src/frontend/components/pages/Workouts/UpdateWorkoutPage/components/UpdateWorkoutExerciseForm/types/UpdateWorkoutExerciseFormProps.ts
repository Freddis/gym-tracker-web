import {WorkoutExerciseWithSets} from 'src/frontend/types/ExerciseWithSets';

export interface UpdateWorkoutExerciseFormProps {
  item: WorkoutExerciseWithSets,
  onDelete: (item: WorkoutExerciseWithSets)=> void
}

import {PrimitiveAtom} from 'jotai';
import {WorkoutExercise} from '../../../../../../../../utils/openapi-client';
export interface WorkoutExerciseUpdateFormProps {
  item: PrimitiveAtom<WorkoutExercise>,
  onDelete: (item: WorkoutExercise)=> void
}

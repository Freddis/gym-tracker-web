import {PrimitiveAtom} from 'jotai';
import {WorkoutExercise, WorkoutUpdateDto} from '../../../../../../../../utils/openapi-client';
import {ErrorSlice} from '../../../../../../../../utils/useResponseErrors';
export interface WorkoutExerciseUpdateFormProps {
  item: PrimitiveAtom<WorkoutExercise>,
  onDelete: (item: WorkoutExercise)=> void
  errors?: ErrorSlice<WorkoutUpdateDto['exercises'][0]>
}

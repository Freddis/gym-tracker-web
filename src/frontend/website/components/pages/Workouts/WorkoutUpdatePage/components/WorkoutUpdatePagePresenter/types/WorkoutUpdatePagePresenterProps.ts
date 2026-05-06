import {MouseEventHandler} from 'react';
import {Workout, WorkoutUpdateDto} from '../../../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../../../common/utils/useResponseErrors';

export interface WorkoutUpdatePagePresenterProps {
  item: Workout
  onSaveClick: MouseEventHandler<HTMLButtonElement>
  onDeleteClick: MouseEventHandler<HTMLButtonElement>
  onUpdate: (item: WorkoutUpdateDto) => void
  errors?: ErrorSlice<WorkoutUpdateDto>
}

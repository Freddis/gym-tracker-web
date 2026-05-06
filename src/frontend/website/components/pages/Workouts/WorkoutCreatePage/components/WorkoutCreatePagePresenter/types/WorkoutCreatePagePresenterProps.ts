import {MouseEventHandler} from 'react';
import {Workout, WorkoutUpdateDto} from '../../../../../../../../common/utils/openapi-client';
import {ErrorSlice} from '../../../../../../../../common/utils/useResponseErrors';

export interface WorkoutCreatePagePresenterProps {
  item: Omit<Workout, 'id'>
  onSaveClick: MouseEventHandler<HTMLButtonElement>
  onUpdate: (item: WorkoutUpdateDto) => void
  errors?: ErrorSlice<WorkoutUpdateDto>
}

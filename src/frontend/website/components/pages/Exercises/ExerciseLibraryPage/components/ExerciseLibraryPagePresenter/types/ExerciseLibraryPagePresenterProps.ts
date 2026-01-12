import {Exercise} from '../../../../../../../../common/utils/openapi-client';
import {ExerciseLibraryQueryParams} from './ExercisesLibraryQuery';
import {ApiErrorResponse} from '../../../../../../../../common/types/ApiErrorResponse';
import {ExerciseLibraryPageState} from './ExerciseLibraryPageState';

export interface ExerciseLibraryPagePresenterProps {
  filter: ExerciseLibraryQueryParams;
  items: Exercise[];
  apiError?: ApiErrorResponse;
  state: {
    status: ExerciseLibraryPageState,
    isLoadingNextPage: boolean
  },
  onNextPage:() => void;
  onFilter: (params: ExerciseLibraryQueryParams) => void;
}

import {Exercise, User} from '../../../../../../../../common/utils/openapi-client';
import {ExerciseLibraryQueryParams} from './ExercisesLibraryQuery';
import {ApiErrorResponse} from '../../../../../../../../common/types/ApiErrorResponse';
import {ExerciseLibraryPageState} from './ExerciseLibraryPageState';
import {RouteId} from '../../../../../../../../common/utils/route';

export interface ExerciseLibraryPagePresenterProps {
  own?: boolean;
  user?: User;
  filter: ExerciseLibraryQueryParams;
  items: Exercise[];
  apiError?: ApiErrorResponse;
  state: {
    status: ExerciseLibraryPageState,
    isLoadingNextPage: boolean
  },
  onNextPage:() => void;
  onFilter: (params: ExerciseLibraryQueryParams) => void;
  route: RouteId.ExerciseLibrary | RouteId.ExerciseList;
}

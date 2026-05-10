import {Exercise} from '../../../../../../../../common/utils/openapi-client';
import {RouteId} from '../../../../../../../../common/utils/route';
import {ExerciseLibraryQueryParams} from '../../ExerciseLibraryPagePresenter/types/ExercisesLibraryQuery';

export interface ExerciseBlockProps {
  item: Exercise;
  params?: ExerciseLibraryQueryParams,
  className?: string,
  route: RouteId.ExerciseLibrary | RouteId.ExerciseList;
};

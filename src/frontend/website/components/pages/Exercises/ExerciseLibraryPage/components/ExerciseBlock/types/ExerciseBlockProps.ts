import {Exercise} from '../../../../../../../../common/utils/openapi-client';
import {ExerciseLibraryQueryParams} from '../../ExerciseLibraryPagePresenter/types/ExercisesLibraryQuery';

export interface ExerciseBlockProps {
  item: Exercise;
  params?: ExerciseLibraryQueryParams,
  className?: string,
};

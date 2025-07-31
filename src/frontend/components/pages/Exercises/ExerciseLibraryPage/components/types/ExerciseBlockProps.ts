import {Exercise} from '../../../../../../utils/openapi-client';
import {ExerciseLibraryQueryParams} from '../../types/ExercisesLibraryQuery';

export interface ExerciseBlockProps {
  item: Exercise;
  params?: ExerciseLibraryQueryParams,
};

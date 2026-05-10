import {createFileRoute} from '@tanstack/react-router';
import {
  exeriseLibraryQueryValidator,
// eslint-disable-next-line max-len
} from '../../frontend/website/components/pages/Exercises/ExerciseLibraryPage/components/ExerciseLibraryPagePresenter/types/ExercisesLibraryQuery';
import {ExerciseListPage} from '../../frontend/website/components/pages/Exercises/ExerciseListPage/ExerciseListPage';

export const Route = createFileRoute('/exercises/')({
  component: ExerciseListPage,
  validateSearch: exeriseLibraryQueryValidator,
  search: {},
});

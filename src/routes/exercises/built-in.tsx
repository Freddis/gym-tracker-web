import {createFileRoute} from '@tanstack/react-router';
import {ExerciseLibraryPage} from '../../frontend/website/components/pages/Exercises/ExerciseLibraryPage/ExerciseLibraryPage';
import {
  exeriseLibraryQueryValidator,
// eslint-disable-next-line max-len
} from '../../frontend/website/components/pages/Exercises/ExerciseLibraryPage/components/ExerciseLibraryPagePresenter/types/ExercisesLibraryQuery';

export const Route = createFileRoute('/exercises/built-in')({
  component: ExerciseLibraryPage,
  validateSearch: exeriseLibraryQueryValidator,
  search: {},
});

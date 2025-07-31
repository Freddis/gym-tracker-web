import {createFileRoute} from '@tanstack/react-router';
import {ExerciseLibraryPage} from 'src/frontend/components/pages/Exercises/ExerciseLibraryPage/ExerciseLibraryPage';
import {exceriseLibraryQueryValidator} from '../../frontend/components/pages/Exercises/ExerciseLibraryPage/types/ExercisesLibraryQuery';

export const Route = createFileRoute('/exercises/')({
  component: ExerciseLibraryPage,
  validateSearch: exceriseLibraryQueryValidator,
  search: {},
});

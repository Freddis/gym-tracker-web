import {createFileRoute} from '@tanstack/react-router';
import {ExerciseLibraryPage} from 'src/components/pages/Exercises/ExerciseLibraryPage/ExerciseLibraryPage';

export const Route = createFileRoute('/exercises/')({
  component: ExerciseLibraryPage,
});

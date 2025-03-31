import {createFileRoute} from '@tanstack/react-router';
import {AddExercisePage} from 'src/components/pages/Exercises/AddExercisePage/AddExercisePage';

export const Route = createFileRoute('/exercises/create')({
  component: AddExercisePage,
});


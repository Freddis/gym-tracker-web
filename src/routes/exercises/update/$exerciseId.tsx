import {createFileRoute} from '@tanstack/react-router';
import {UpdateExercisePage} from 'src/components/pages/Exercises/UpdateExercisePage';

export const Route = createFileRoute('/exercises/update/$exerciseId')({
  component: UpdateExercisePage,
});


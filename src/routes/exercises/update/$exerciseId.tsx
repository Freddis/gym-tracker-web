import {createFileRoute} from '@tanstack/react-router';
import {UpdateExercisePage} from 'src/frontend/components/pages/Exercises/UpdateExercisePage/UpdateExercisePage';

export const Route = createFileRoute('/exercises/update/$exerciseId')({
  component: UpdateExercisePage,
});


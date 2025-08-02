import {createFileRoute} from '@tanstack/react-router';
import {ViewExercisePage} from '../../frontend/components/pages/Exercises/ViewExercisePage/ViewExercisePage';

export const Route = createFileRoute('/exercises/$exerciseId')({
  component: ViewExercisePage,
});


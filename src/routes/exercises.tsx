import {createFileRoute} from '@tanstack/react-router';
import {ExercisePage} from 'src/pages/ExercisePage';

export const Route = createFileRoute('/exercises')({
  component: ExercisePage,
});

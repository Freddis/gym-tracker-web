import {createFileRoute} from '@tanstack/react-router';
import {ExerciseCreatePage} from '../../frontend/website/components/pages/Exercises/ExerciseCreatePage/ExerciseCreatePage';

export const Route = createFileRoute('/exercises/create')({
  component: ExerciseCreatePage,
});


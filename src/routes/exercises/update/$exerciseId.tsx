import {createFileRoute} from '@tanstack/react-router';
import {UpdateExercisePage} from '../../../frontend/website/components/pages/Exercises/ExerciseUpdatePage/UpdateExercisePage';

export const Route = createFileRoute('/exercises/update/$exerciseId')({
  component: UpdateExercisePage,
});


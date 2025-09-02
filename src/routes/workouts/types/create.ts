import {createFileRoute} from '@tanstack/react-router';
import {WorkoutTypeCreatePage} from '../../../frontend/components/pages/WorkoutTypes/WorkoutTypeCreatePage';

export const Route = createFileRoute('/workouts/types/create')({
  component: WorkoutTypeCreatePage,
});

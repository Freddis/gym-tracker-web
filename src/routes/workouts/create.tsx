import {createFileRoute} from '@tanstack/react-router';
import {WorkoutCreatePage} from '../../frontend/website/components/pages/Workouts/WorkoutCreatePage/WorkoutCreatePage';

export const Route = createFileRoute('/workouts/create')({
  component: WorkoutCreatePage,
});

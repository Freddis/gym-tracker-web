import {createFileRoute} from '@tanstack/react-router';
import {WorkoutTypeUpdatePage} from '../../../../frontend/website/components/pages/WorkoutTypes/WorkoutTypeUpdatePage';

export const Route = createFileRoute('/workouts/types/update/$id')({
  component: WorkoutTypeUpdatePage,
});

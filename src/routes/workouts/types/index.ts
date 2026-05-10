import {createFileRoute} from '@tanstack/react-router';
import {WorkoutTypeListPage} from '../../../frontend/website/components/pages/WorkoutTypes/WorkoutTypeListPage/WorkoutTypeListPage';

export const Route = createFileRoute('/workouts/types/')({
  component: WorkoutTypeListPage,
});

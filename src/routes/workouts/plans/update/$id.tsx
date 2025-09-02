import {createFileRoute} from '@tanstack/react-router';
import {WorkoutPlanUpdatePage} from '../../../../frontend/components/pages/WorkoutPlans/WorkoutPlanUpdatePage';

export const Route = createFileRoute('/workouts/plans/update/$id')({
  component: WorkoutPlanUpdatePage,
});

import {createFileRoute} from '@tanstack/react-router';
import {WorkoutPlanUpdatePage} from '../../../../frontend/website/components/pages/WorkoutPlans/WorkoutPlanUpdatePage';

export const Route = createFileRoute('/workouts/plans/update/$id')({
  component: WorkoutPlanUpdatePage,
});

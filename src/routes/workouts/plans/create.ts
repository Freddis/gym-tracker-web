import {createFileRoute} from '@tanstack/react-router';
import {WorkoutPlanCreatePage} from '../../../frontend/website/components/pages/WorkoutPlans/WorkoutPlanCreatePage';

export const Route = createFileRoute('/workouts/plans/create')({
  component: WorkoutPlanCreatePage,
});

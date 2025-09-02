import {createFileRoute} from '@tanstack/react-router';
import {WorkoutPlanListPage} from '../../../frontend/components/pages/WorkoutPlans/WorkoutPlanListPage';

export const Route = createFileRoute('/workouts/plans/')({
  component: WorkoutPlanListPage,
});

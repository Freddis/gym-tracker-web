import {createFileRoute} from '@tanstack/react-router';
import {UpdateWorkoutPage} from 'src/frontend/components/pages/Workouts/UpdateWorkoutPage/UpdateWorkoutPage';

export const Route = createFileRoute('/workouts/update/$workoutId')({
  component: UpdateWorkoutPage,
});

import {createFileRoute} from '@tanstack/react-router';
import {WorkoutUpdatePage} from 'src/frontend/components/pages/Workouts/UpdateWorkoutPage/WorkoutUpdatePage';

export const Route = createFileRoute('/workouts/update/$id')({
  component: WorkoutUpdatePage,
});

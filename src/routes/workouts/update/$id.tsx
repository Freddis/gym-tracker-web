import {createFileRoute} from '@tanstack/react-router';
import {WorkoutUpdatePage} from '../../../frontend/website/components/pages/Workouts/WorkoutUpdatePage/WorkoutUpdatePage';

export const Route = createFileRoute('/workouts/update/$id')({
  component: WorkoutUpdatePage,
});

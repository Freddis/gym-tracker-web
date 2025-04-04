import {createFileRoute} from '@tanstack/react-router';
import {WorkoutListPage} from 'src/frontend/components/pages/Workouts/WorkoutListPage/WorkoutListPage';
import {z} from 'zod';

const queryParams = z.object({
  page: z.number().optional(),
});

export const Route = createFileRoute('/workouts/')({
  component: WorkoutListPage,
  validateSearch: queryParams,
});

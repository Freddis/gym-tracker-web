import {createFileRoute} from '@tanstack/react-router';
import {ExerciseUpdatePage} from '../../../../frontend/crm/components/pages/exercises/ExerciseUpdatePage/ExerciseUpdatePage';

export const Route = createFileRoute('/crm/exercises/update/$id')({
  component: ExerciseUpdatePage,
});

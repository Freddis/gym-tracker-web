import {createFileRoute} from '@tanstack/react-router';
import {ExerciseListPage} from '../../../frontend/crm/components/pages/exercises/ExerciseListPage/ExerciseListPage';
import {
  exerciseListQueryValidator,
} from '../../../frontend/crm/components/pages/exercises/ExerciseListPage/validators/exerciseListQueryValidator';

export const Route = createFileRoute('/crm/exercises/')({
  component: ExerciseListPage,
  validateSearch: exerciseListQueryValidator,
});

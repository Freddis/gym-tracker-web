import {createFileRoute} from '@tanstack/react-router';
import {ExerciseListPage} from '../../../frontend/crm/components/pages/Exercises/ExerciseListPage/ExerciseListPage';
import {paginatedQueryValidator} from '../../../frontend/crm/utils/validators/paginatedQueryValidator';

export const Route = createFileRoute('/crm/exercises/')({
  component: ExerciseListPage,
  validateSearch: paginatedQueryValidator,
});

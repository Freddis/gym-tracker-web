import {createFileRoute} from '@tanstack/react-router';
import {ExerciseListPage} from '../../../frontend/crm/components/pages/Exercises/ExerciseListPage/ExerciseListPage';
import {
  exerciseListQueryValidator,
} from '../../../frontend/crm/components/pages/Exercises/ExerciseListPage/validators/exerciseListQueryValidator';

export const Route = createFileRoute('/crm/exercises/')({
  component: ExerciseListPage,
  validateSearch: exerciseListQueryValidator,
});

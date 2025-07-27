import {createFileRoute} from '@tanstack/react-router';
import {ExerciseLibraryPage} from 'src/frontend/components/pages/Exercises/ExerciseLibraryPage/ExerciseLibraryPage';
import {nativeEnum, object, string} from 'zod';
import {Muscle} from '../../common/enums/Muscle';

export const Route = createFileRoute('/exercises/')({
  component: ExerciseLibraryPage,
  validateSearch: object({
    filter: string().optional(),
    muscles: nativeEnum(Muscle).array().optional(),
  }),
  search: {},
});

import {createFileRoute} from '@tanstack/react-router';
import {FoodLibraryPage} from '../../frontend/website/components/pages/Food/FoodLibraryPage/FoodLibraryPage';
import {object, string} from 'zod';

export const Route = createFileRoute('/food/built-in')({
  component: FoodLibraryPage,
  validateSearch: object({
    search: string().optional(),
    cursor: string().optional(),
  }),
});

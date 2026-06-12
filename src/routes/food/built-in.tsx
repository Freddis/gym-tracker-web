import {createFileRoute} from '@tanstack/react-router';
import {FoodLibraryPage} from '../../frontend/website/components/pages/Food/FoodLibraryPage/FoodLibraryPage';
import {number, object, string} from 'zod';

export const Route = createFileRoute('/food/built-in')({
  component: FoodLibraryPage,
  validateSearch: object({
    search: string().optional(),
    page: number().optional(),
  }),
});

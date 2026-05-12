import {createFileRoute} from '@tanstack/react-router';
import {MealUpdatePage} from '../../../frontend/website/components/pages/meal/MealUpdatePage/MealUpdatePage';

export const Route = createFileRoute('/meals/update/$id')({
  component: MealUpdatePage,
});

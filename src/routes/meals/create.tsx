import {createFileRoute} from '@tanstack/react-router';
import {MealCreatePage} from '../../frontend/website/components/pages/meal/MealCreatePage/MealCreatePage';

export const Route = createFileRoute('/meals/create')({
  component: MealCreatePage,
});

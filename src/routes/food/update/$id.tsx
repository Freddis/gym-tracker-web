import {createFileRoute} from '@tanstack/react-router';
import {FoodUpdatePage} from '../../../frontend/website/components/pages/Food/FoodUpdatePage/FoodUpdatePage';

export const Route = createFileRoute('/food/update/$id')({
  component: FoodUpdatePage,
});

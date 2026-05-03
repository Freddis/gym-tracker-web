import {createFileRoute} from '@tanstack/react-router';
import {FoodCreatePage} from '../../frontend/website/components/pages/Food/FoodCreatePage/FoodCreatePage';

export const Route = createFileRoute('/food/create')({
  component: FoodCreatePage,
});

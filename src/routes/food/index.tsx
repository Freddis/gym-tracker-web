import {createFileRoute} from '@tanstack/react-router';
import {FoodListPage} from '../../frontend/website/components/pages/Food/FoodListPage/FoodListPage';
import {foodListQueryValidator} from '../../frontend/website/components/pages/Food/FoodListPage/validators/foodListQueryValidator';

export const Route = createFileRoute('/food/')({
  component: FoodListPage,
  validateSearch: foodListQueryValidator,
});

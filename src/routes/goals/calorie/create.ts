import {createFileRoute} from '@tanstack/react-router';
import {CalorieGoalCreatePage} from '../../../frontend/website/components/pages/calorie-goal/CalorieGoalCreatePage/CalorieGoalCreatePage';

export const Route = createFileRoute('/goals/calorie/create')({
  component: CalorieGoalCreatePage,
});

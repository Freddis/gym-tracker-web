import {createFileRoute} from '@tanstack/react-router';
import {WeightCreatePage} from '../../frontend/components/pages/Weight/WeightCreatePage/WeightCreatePage';

export const Route = createFileRoute('/weight/create')({
  component: WeightCreatePage,
});

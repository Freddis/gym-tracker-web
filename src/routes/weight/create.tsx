import {createFileRoute} from '@tanstack/react-router';
import {WeightCreatePage} from '../../frontend/website/components/pages/Weight/WeightCreatePage/WeightCreatePage';

export const Route = createFileRoute('/weight/create')({
  component: WeightCreatePage,
});

import {createFileRoute} from '@tanstack/react-router';
import {WeightUpdatePage} from '../../../frontend/website/components/pages/Weight/WeightUpdatePage/WeightUpdatePage';

export const Route = createFileRoute('/weight/update/$id')({
  component: WeightUpdatePage,
});

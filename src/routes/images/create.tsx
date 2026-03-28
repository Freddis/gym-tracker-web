import {createFileRoute} from '@tanstack/react-router';
import {ImageCreatePage} from '../../frontend/website/components/pages/images/ImageCreatePage/ImageCreatePage';

export const Route = createFileRoute('/images/create')({
  component: ImageCreatePage,
});

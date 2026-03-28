import {createFileRoute} from '@tanstack/react-router';
import {ImageUpdatePage} from '../../../frontend/website/components/pages/images/ImageUpdatePage/ImageUpdatePage';

export const Route = createFileRoute('/images/update/$id')({
  component: ImageUpdatePage,
});

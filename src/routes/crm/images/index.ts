import {createFileRoute} from '@tanstack/react-router';
import {ImageListPage} from '../../../frontend/crm/components/pages/images/ImageListPage/ImageListPage';
import {
  imageListQueryValidator,
} from '../../../frontend/crm/components/pages/images/ImageListPage/validators/imageListQueryValidator';

export const Route = createFileRoute('/crm/images/')({
  component: ImageListPage,
  validateSearch: imageListQueryValidator,
});

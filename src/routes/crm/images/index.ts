import {createFileRoute} from '@tanstack/react-router';
import {ImageListPage} from '../../../frontend/crm/components/pages/images/ImageListPage/ImageListPage';
import {paginatedQueryValidator} from '../../../frontend/crm/utils/validators/paginatedQueryValidator';

export const Route = createFileRoute('/crm/images/')({
  component: ImageListPage,
  validateSearch: paginatedQueryValidator,
});

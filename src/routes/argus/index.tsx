import {createFileRoute} from '@tanstack/react-router';
import {z} from 'zod';
import {ArgusCheckinListPage} from '../../frontend/components/pages/ArgusCheckins/ArgusEntriesListPage/ArgusCheckinListPage';

const queryParams = z.object({
  page: z.number().optional(),
  type: z.string().optional(),
});

export const Route = createFileRoute('/argus/')({
  component: ArgusCheckinListPage,
  validateSearch: queryParams,
});

import {createFileRoute} from '@tanstack/react-router';
import {z} from 'zod';
import {ArgusEntriesListPage} from '../../frontend/components/pages/ArgusCheckins/ArgusEntriesListPage/ArgusEntriesListPage';

const queryParams = z.object({
  page: z.number().optional(),
  type: z.string().optional(),
});

export const Route = createFileRoute('/argus/')({
  component: ArgusEntriesListPage,
  validateSearch: queryParams,
});

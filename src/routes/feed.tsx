import {createFileRoute} from '@tanstack/react-router';
import {EntriesListPage} from 'src/components/pages/Entries/EntriersListPage/EntriesListPage';
import {z} from 'zod';


const queryParams = z.object({
  page: z.number().optional(),
  type: z.string().optional(),
});

export const Route = createFileRoute('/feed')({
  component: EntriesListPage,
  validateSearch: queryParams,
});

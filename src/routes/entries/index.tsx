import {createFileRoute} from '@tanstack/react-router';
import {EntryListPage} from 'src/frontend/components/pages/Activities/EntryListPage/EntryListPage';
import {nativeEnum, z} from 'zod';
import {EntryType} from '../../frontend/utils/openapi-client';

const queryParams = z.object({
  page: z.number().optional(),
  type: nativeEnum(EntryType).optional(),
});

export const Route = createFileRoute('/entries/')({
  component: EntryListPage,
  validateSearch: queryParams,
});

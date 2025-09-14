import {createFileRoute} from '@tanstack/react-router';
import {nativeEnum, z} from 'zod';
import {EntryType} from '../../frontend/common/utils/openapi-client';
import {EntryListPage} from '../../frontend/website/components/pages/Activities/EntryListPage/EntryListPage';

const queryParams = z.object({
  page: z.number().optional(),
  type: nativeEnum(EntryType).array().optional(),
});

export const Route = createFileRoute('/entries/')({
  component: EntryListPage,
  validateSearch: queryParams,
});

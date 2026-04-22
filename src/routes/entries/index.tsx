import {createFileRoute} from '@tanstack/react-router';
import {EntryListPage} from '../../frontend/website/components/pages/Activities/EntryListPage/EntryListPage';
import {entryListQueryParams} from '../../frontend/website/components/pages/Activities/EntryListPage/validators/entryListQueryParams';


export const Route = createFileRoute('/entries/')({
  component: EntryListPage,
  validateSearch: entryListQueryParams,
});

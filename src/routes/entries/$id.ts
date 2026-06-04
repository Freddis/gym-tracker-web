import {createFileRoute} from '@tanstack/react-router';
import {EntryViewPage} from '../../frontend/website/components/pages/Activities/EntryViewPage/EntryViewPage';

export const Route = createFileRoute('/entries/$id')({
  component: EntryViewPage,
});

import {createFileRoute} from '@tanstack/react-router';
import {AddEntryPage} from '../../frontend/components/pages/Activities/AddEntryPage/AddEntryPage';

export const Route = createFileRoute('/entries/add')({
  component: AddEntryPage,
});

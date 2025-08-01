import {createFileRoute} from '@tanstack/react-router';
import {FeedPage} from '../../frontend/components/pages/Feed/FeedPage';
import {feedPageQuery} from '../../frontend/components/pages/Feed/validators/feedPageQuery';

export const Route = createFileRoute('/feed/')({
  component: FeedPage,
  validateSearch: feedPageQuery,
});

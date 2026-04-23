import {createFileRoute} from '@tanstack/react-router';
import {PostUpdatePage} from '../../../frontend/website/components/pages/posts/PostUpdatePage/PostUpdatePage';

export const Route = createFileRoute('/posts/update/$id')({
  component: PostUpdatePage,
});

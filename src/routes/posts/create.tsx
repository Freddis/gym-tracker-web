import {createFileRoute} from '@tanstack/react-router';
import {PostCreatePage} from '../../frontend/website/components/pages/posts/PostCreatePage/PostCreatePage';

export const Route = createFileRoute('/posts/create')({
  component: PostCreatePage,
});

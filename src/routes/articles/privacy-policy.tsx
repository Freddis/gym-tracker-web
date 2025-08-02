import {createFileRoute} from '@tanstack/react-router';
import {ArticlePage} from '../../frontend/components/pages/ArticlePage/ArticlePage';
import {Article} from '../../frontend/components/pages/ArticlePage/types/Article';

export const Route = createFileRoute('/articles/privacy-policy')({
  component: () => <ArticlePage article={Article.PrivacyPolicy} />,
});

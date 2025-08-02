import {createFileRoute} from '@tanstack/react-router';
import {ArticlePage} from '../../frontend/components/pages/ArticlePage/ArticlePage';
import {Article} from '../../frontend/components/pages/ArticlePage/types/Article';

export const Route = createFileRoute('/articles/terms-of-service')({
  component: () => <ArticlePage article={Article.TermsOfService}/>,
});

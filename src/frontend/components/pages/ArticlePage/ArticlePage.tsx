import {FC} from 'react';
import {AppBlock} from '../../atoms/AppBlock/AppBlock';
import {PageContainer} from '../../layout/PageContainer/PageContainer';
import {Article} from './types/Article';
import {TermsOfServiceArticle} from './components/TermsOfServiceArticle';
import {ReactNode} from '@tanstack/react-router';
import {PrivacyPolicy} from './components/PrivacyPolicy';
import {AppLink, AppLinkProps} from '../../atoms/AppLink/AppLink';
import {AppPageHeading} from '../../atoms/AppPageHeading/AppPageHeading';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';

export const ArticlePage: FC<{article: Article}> = ({article}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.static.articles);
  const articleMap: Record<Article, ReactNode> = {
    [Article.TermsOfService]: <TermsOfServiceArticle />,
    [Article.PrivacyPolicy]: <PrivacyPolicy />,
  };
  const links: Record<Article, {to: AppLinkProps['to'], name: string}> = {
    [Article.TermsOfService]: {to: '/articles/terms-of-service', name: t(i18n.articles.termsOfService)},
    [Article.PrivacyPolicy]: {to: '/articles/privacy-policy', name: t(i18n.articles.privacyPolicy)},
  };
  return (
    <PageContainer>
      <div className="w-full max-w-5xl">
        <div className="w-full text-left mb-5">
          <AppPageHeading>{t(i18n.header)}</AppPageHeading>
        </div>
        <div className="grid grid-cols-8 gap-5">
          <AppBlock className="w-full p-5 col-span-2">
            <h2 className="text-left text-lg  mb-3">{t(i18n.labels.categories)}</h2>
            <div className="flex flex-col gap-2">
            {Object.keys(links).map((x) => (
              <AppLink to={links[x].to} className={x !== article ? 'text-on-surface' : 'font-normal'}>{links[x].name}</AppLink>
            ))}
            </div>
          </AppBlock>
          <div className="prose-sm col-span-6">
          {articleMap[article]}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

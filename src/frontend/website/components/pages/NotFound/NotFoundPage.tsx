import {PageContainer} from '../../../../common/components/layout/PageContainer/PageContainer';
import {AppBlock} from '../../../../common/components/atoms/AppBlock/AppBlock';
import {FC} from 'react';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';

export const NotFoundPage: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.static.notFound);
  return (
    <PageContainer className="justify-center">
      <AppBlock className="max-w-2xl min-h-100 max-h-full flex items-center">
        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-10">
          <div className="text-5xl md:border-r-1 border-on-surface/50 md:px-10 flex flex-row items-center">
            <h2 className="font-semibold" data-testid="status">{t(i18n.code)}</h2>
          </div>
          <div className="flex items-center">
            <div className="text-center md:text-left">
              <h1 className="text-xl mb-5 font-normal" data-testid="title">{t(i18n.title)}</h1>
              <p data-testid="description">{t(i18n.description)}</p>
            </div>
          </div>
        </div>
      </AppBlock>
    </PageContainer>
  );
};

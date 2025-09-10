import {ErrorComponentProps} from '@tanstack/react-router';
import {FC} from 'react';
import {AppLink} from '../../../atoms/AppLink/AppLink';
import {AppLogo} from '../../../atoms/AppLogo/AppLogo';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {PageContainer} from '../../../layout/PageContainer/PageContainer';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

export const ErrorPagePresenter: FC<ErrorComponentProps> = (props) => {
  // todo: delete this before release
  console.log(props.error);
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.static.error);
  return (
    <div className="palette-neutral bg-main text-on-main ">
      <PageContainer className="justify-center min-h-screen">
        <AppBlock className="max-w-2xl min-h-100 max-h-full flex flex-col items-center">
          <div className="flex flex-col items-center">
            <AppLink to="/">
              <AppLogo withText className="my-15"/>
            </AppLink>
            <div className="flex flex-col items-center md:flex-row md:items-stretch gap-10">
              <div className="flex items-center">
                <div className="text-center md:text-left">
                  <h1 className="text-xl mb-5 font-normal">{t(i18n.title)}</h1>
                  <p>{t(i18n.description)}</p>
                    <AppLink to="/" className="inline-block mt-5">{t(i18n.link)}</AppLink>
                </div>
              </div>
            </div>
          </div>
        </AppBlock>
      </PageContainer>
    </div>
  );
};

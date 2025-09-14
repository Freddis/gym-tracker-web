import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {useToasts} from '../../../../../common/components/atoms/AppToast/hooks/useToasts';
import {AppButton} from '../../../../../common/components/atoms/AppButton/AppButton';

export const HeroBlock: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.static.home.hero);
  const toasts = useToasts();

  const onCtaClick = () => {
    toasts.addWarning(t(i18n.toasts.appNotYetPublished));
  };
  return (
      <div className="h-[60vh] min-h-12 bg-[url(/images/pages/home/hero-1.jpg)]
      0 bg-cover">
        <div className="bg-black/50 w-full h-full flex items-center justify-center">
            <div className="p-5 mb-10 text-center">
              <h1 className="text-white text-4xl uppercase">
                <span className="text-accent">{t(i18n.heading.start)}</span>
                <span>{t(i18n.heading.middle)}</span>
                <span className="text-accent">{t(i18n.heading.end)}</span>
              </h1>
              <p className="text-white text-xl mt-5">{t(i18n.subheading)}
              </p>
              <AppButton id="hero-cta-button" variant="lg" className="mt-10" onClick={onCtaClick}>{t(i18n.button)}</AppButton>
            </div>
        </div>
      </div>
  );
};

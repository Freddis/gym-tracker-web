import {FC} from 'react';
import {AppButton} from 'src/frontend/components/atoms/AppButton/AppButton';
import {useAppPartialTranslation} from '../../../../i18n/useAppPartialTranslation';

export const HeroBlock: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.static.home.hero);
  const imgUrl = '/images/pages/home/hero-1.jpg';
  const backgroundImage = `url(${imgUrl})`;
  return (
      <div style={{backgroundImage}} className="h-180 bg-cover">
        <div className="bg-black/50 w-full h-full flex items-center justify-center">
            <div className="p-5 mb-10 text-center">
              <h1 className="text-white text-4xl uppercase">
                <span className="text-accent">{t(i18n.heading.start)}</span>
                <span>{t(i18n.heading.middle)}</span>
                <span className="text-accent">{t(i18n.heading.end)}</span>
              </h1>
              <p className="text-white text-lg mt-5">{t(i18n.subheading)}
              </p>
              <AppButton variant="lg" className="mt-10">{t(i18n.button)}</AppButton>
            </div>
        </div>
      </div>
  );
};

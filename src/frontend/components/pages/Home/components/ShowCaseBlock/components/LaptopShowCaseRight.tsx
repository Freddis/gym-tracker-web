import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {GrAnalytics} from 'react-icons/gr';
import {ImRocket} from 'react-icons/im';
import {FaCrown} from 'react-icons/fa6';
import {Feature} from './Feature';

export const LaptopShowCaseRight: FC = () => {
  const {t, i18n} = useAppPartialTranslation(
    (x) => x.pages.static.home.features
  );
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full bg-main text-on-main pb-20 px-5 md:px-0">
      <div className="flex flex-col md:items-end justify-evenly gap-10 md:py-30 md:pr-20">
        <Feature title={t(i18n.ownExercises.title)} description={t(i18n.ownExercises.description)} icon={FaCrown} />
        <Feature title={t(i18n.analytics.title)} description={t(i18n.analytics.description)} icon={GrAnalytics} />
        <Feature title={t(i18n.freeFeatures.title)} description={t(i18n.freeFeatures.description)} icon={ImRocket} />
      </div>
      <div className="w-full h-full overflow-hidden flex justify-center">
        <img
        src="/images/pages/home/laptop.png"
        className="min-h-60 max-h-40 md:max-h-200 h-full object-cover object-left  mb-20 md:mb-0"
        />
      </div>
    </div>
  );
};

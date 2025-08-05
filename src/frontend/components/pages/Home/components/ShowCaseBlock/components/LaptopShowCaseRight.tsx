import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {GrAnalytics} from 'react-icons/gr';
import {ImRocket} from 'react-icons/im';
import {FaCrown} from 'react-icons/fa6';
export const LaptopShowCaseRight: FC = () => {
  const {t, i18n} = useAppPartialTranslation(
    (x) => x.pages.static.home.features
  );
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full bg-main text-on-main pb-20 px-5 md:px-0">
      <div className="flex flex-col md:items-end justify-evenly gap-10 md:py-30 md:pr-20">
 <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
          <FaCrown size={100} className="min-w-20" />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left text-xl mb-2">{t(i18n.ownExercises.title)}</h3>
            <p className="text-lg text-center md:text-left">{t(i18n.ownExercises.description)}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
          <GrAnalytics size={100} className="min-w-20" />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left text-xl mb-2">{t(i18n.analytics.title)}</h3>
            <p className="text-lg text-center md:text-left">{t(i18n.analytics.description)}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
          <ImRocket size={100} className="min-w-20" />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left text-xl mb-2">{t(i18n.freeFeatures.title)}</h3>
            <p className="text-lg text-center md:text-left">{t(i18n.freeFeatures.description)}</p>
          </div>
        </div>
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

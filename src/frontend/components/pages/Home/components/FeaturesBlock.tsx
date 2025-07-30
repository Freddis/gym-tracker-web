import {FC} from 'react';
import {IoFastFood} from 'react-icons/io5';
import {FaDumbbell} from 'react-icons/fa';
import {MdOutlineSportsHandball} from 'react-icons/md';
import {GrAnalytics} from 'react-icons/gr';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

export const FeaturesBlock: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.static.home.features);
  return (
    <div className="justify-center p-20 flex bg-main text-on-main">
      <div className="max-w-5xl text-center">
        <h2 className="text-2xl uppercase">{t(i18n.heading.start)}<span className="text-accent">{t(i18n.heading.end)}</span></h2>
        <div className="grid w-full max-w-sm grid-cols-1 md:grid-cols-4 md:max-w-full gap-10 mt-10 text-justify">
          <div>
            <FaDumbbell size={60} className="m-auto" />
            <h3 className="text-accent text-center uppercase mt-2">{t(i18n.workouts.title)}</h3>
            <p>{t(i18n.workouts.description)}</p>
          </div>
          <div>
            <IoFastFood size={60} className="m-auto" />
            <h3 className="text-accent text-center uppercase mt-2">{t(i18n.activities.title)}</h3>
            <p>{t(i18n.activities.description)}</p>
          </div>
          <div>
            <MdOutlineSportsHandball size={60} className="m-auto" />
            <h3 className="text-accent text-center uppercase mt-2">{t(i18n.calories.title)}</h3>
            <p>{t(i18n.calories.description)}</p>
          </div>
          <div>
            <GrAnalytics size={60} className="m-auto" />
            <h3 className="text-accent text-center uppercase mt-2">{t(i18n.analytics.title)}</h3>
            <p>{t(i18n.analytics.description)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import {FC} from 'react';
import {FaDumbbell} from 'react-icons/fa';
import {MdOutlineSportsHandball} from 'react-icons/md';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {GrAnalytics} from 'react-icons/gr';

export const IphoneShowCase: FC = () => {
  const {t, i18n} = useAppPartialTranslation(
    (x) => x.pages.static.home.features
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-main text-on-main px-5 pb-20">
       <div
        style={{backgroundImage: 'url(/images/pages/home/iphone.png)'}}
        className="w-full min-h-screen h-full bg-contain bg-no-repeat bg-right"
      ></div>
      <div className="flex flex-col justify-center gap-20 py-10 md:py-40 md:pl-20">
        <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
          <MdOutlineSportsHandball size={100} />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left uppercase text-xl mb-2">
              {t(i18n.activities.title)}
            </h3>
            <p className="text-lg">{t(i18n.activities.description)}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
          <FaDumbbell size={100} />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left  uppercase text-xl mb-2">
              Huge Exercise Library
            </h3>
            <p className="text-lg">{t(i18n.workouts.description)}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
          <GrAnalytics size={100} />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left  uppercase text-xl mb-2">
              Huge Exercise Library
            </h3>
            <p className="text-lg">{t(i18n.workouts.description)}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

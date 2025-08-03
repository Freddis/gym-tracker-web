import {FC} from 'react';
import {FaDumbbell} from 'react-icons/fa';
import {MdOutlineSportsHandball} from 'react-icons/md';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {GrAnalytics} from 'react-icons/gr';

export const LaptopShowCaseRight: FC = () => {
  const {t, i18n} = useAppPartialTranslation(
    (x) => x.pages.static.home.features
  );
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-2 w-full bg-main text-on-main pb-20 px-5">
      <div className="flex flex-col items-end gap-20 md:py-40 md:pr-20">
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
        <div
        style={{backgroundImage: 'url(/images/pages/home/laptop.png)'}}
        className="w-full min-h-60 h-full bg-contain md:bg-cover bg-no-repeat bg-left mb-20 md:mb-0"
      ></div>
    </div>
  );
};

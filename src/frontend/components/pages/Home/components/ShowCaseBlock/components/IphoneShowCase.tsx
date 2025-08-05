import {FC} from 'react';
import {FaDumbbell} from 'react-icons/fa';
import {AiOutlineSafetyCertificate} from 'react-icons/ai';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {TbLibrary} from 'react-icons/tb';
export const IphoneShowCase: FC = () => {
  const {t, i18n} = useAppPartialTranslation(
    (x) => x.pages.static.home.features
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-main text-on-main px-5 pb-20">
       <div
        style={{backgroundImage: 'url(/images/pages/home/iphone.png)'}}
        className="w-full min-h-200 h-full bg-contain bg-no-repeat bg-center md:bg-right"
      ></div>
      <div className="flex flex-col justify-evenly items-left py-10 md:py-10 md:pl-20">
        <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
          <FaDumbbell size={100} className="min-w-20" />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left text-xl mb-2">{t(i18n.workouts.title)}</h3>
            <p className="text-lg text-center md:text-left">{t(i18n.workouts.description)}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
          <TbLibrary size={100} className="min-w-20" />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left text-xl mb-2">{t(i18n.exerciseLibrary.title)}</h3>
            <p className="text-lg text-center md:text-left">{t(i18n.exerciseLibrary.description)}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
          <AiOutlineSafetyCertificate size={100} className="min-w-20" />
          <div className="max-w-100">
            <h3 className="text-accent text-center md:text-left text-xl mb-2">{t(i18n.autonomous.title)}</h3>
            <p className="text-lg text-center md:text-left">{t(i18n.autonomous.description)}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

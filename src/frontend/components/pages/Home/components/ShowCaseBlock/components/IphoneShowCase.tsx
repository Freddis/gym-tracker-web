import {FC} from 'react';
import {FaDumbbell} from 'react-icons/fa';
import {AiOutlineSafetyCertificate} from 'react-icons/ai';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';
import {TbLibrary} from 'react-icons/tb';
import {Feature} from './Feature';
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
        <Feature title={t(i18n.workouts.title)} description={t(i18n.workouts.description)} icon={FaDumbbell} />
        <Feature title={t(i18n.exerciseLibrary.title)} description={t(i18n.exerciseLibrary.description)} icon={TbLibrary} />
        <Feature title={t(i18n.autonomous.title)} description={t(i18n.autonomous.description)} icon={AiOutlineSafetyCertificate} />
      </div>
    </div>
  );
};

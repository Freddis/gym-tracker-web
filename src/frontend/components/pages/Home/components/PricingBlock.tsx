import {FC} from 'react';
import {ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im';
import {HeadingBlock} from './HeadingBlock/HeadingBlock';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';

export const PricingBlock: FC = () => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.static.home.pricing);
  return (
    <div className=" justify-center py-20 px-5 flex bg-main text-on-main">
      <div className="w-4xl max-w-full">
        <HeadingBlock title={t(i18n.heading)}>
          {t(i18n.subheading)}
        </HeadingBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="bg-surface text-on-surface p-10 rounded-xl">
              <h3 className="uppercase block text-center font-bold text-lg mb-5">{t(i18n.plans.free.name)}</h3>
              <div className="text-center text-lg mb-5 font-bold">{t(i18n.plans.free.price)}</div>
              <ul>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.workoutTracking)}</span>
                </li>

                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.analytics)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.dataExport)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.cloudStorage)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>{t(i18n.points.extendedCloudStorage)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>{t(i18n.points.socialFeatures)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>{t(i18n.points.coaching)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxUnchecked size={20}/>
                  <span>{t(i18n.points.extendedAnalytics)}</span>
                </li>
              </ul>
            </div>
            <div className="bg-surface text-on-surface p-10 rounded-xl">
            <h3 className=" uppercase block text-center font-bold text-lg mb-5">{t(i18n.plans.pro.name)}</h3>
            <div className="text-green-700 text-center text-lg mb-5 font-bold">{t(i18n.plans.pro.price)}</div>
              <ul>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.workoutTracking)}</span>
                </li>

                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.analytics)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.dataExport)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.cloudStorage)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.extendedCloudStorage)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.socialFeatures)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.coaching)}</span>
                </li>
                <li className="flex flex-row gap-2 items-center mt-5">
                  <ImCheckboxChecked size={20} className="fill-accent"/>
                  <span>{t(i18n.points.extendedAnalytics)}</span>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

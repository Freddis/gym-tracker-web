import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {IphoneShowCase} from './components/IphoneShowCase';
import {LaptopShowCaseRight} from './components/LaptopShowCaseRight';
import {HeadingBlock} from '../HeadingBlock/HeadingBlock';

export const ShowCaseBlock: FC = () => {
  const {t, i18n} = useAppPartialTranslation(
    (x) => x.pages.static.home.features
  );
  return (
    <div className="justify-center pt-20 px-5 md:px-0 pb-20 flex flex-col items-center bg-main text-on-main">
      <HeadingBlock title= {t(i18n.heading.start) + t(i18n.heading.end)}>
        <span>There is a very good reason </span>
        <span className="text-accent">Discipline</span> exists
      </HeadingBlock>
      <IphoneShowCase />
      <LaptopShowCaseRight/>
    </div>
  );
};

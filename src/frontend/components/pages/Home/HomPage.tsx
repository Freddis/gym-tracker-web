import {FC} from 'react';
import {HeroBlock} from './components/HeroBlock';
import {PricingBlock} from './components/PricingBlock';
import {DownloadAppsBlock} from './components/DownloadAppsBlock';
import {Color} from '../../../utils/design-system/types/Color';
import {LaptopShowcaseBlock} from './components/LaptopShowcaseBlock';
import {IphoneShowcaseBlock} from './components/IphoneShowcaseBlock';

interface HomePageProps {
  palettes?: {
    iphoneShowcase: Color
    laptopShowcase: Color
    pricing: Color
    download: Color
  }
}
export const HomePage: FC<HomePageProps> = ({palettes}) => {
  return (
    <>
    <HeroBlock/>
     <div className={palettes?.pricing ? `palette-${palettes.iphoneShowcase}` : 'palette-lightest'} >
      <IphoneShowcaseBlock/>
    </div>
    <div className={palettes?.pricing ? `palette-${palettes.laptopShowcase}` : 'palette-neutral'} >
      <LaptopShowcaseBlock/>
    </div>
    <div className={palettes?.pricing ? `palette-${palettes.pricing}` : 'palette-darkest'} >
      <PricingBlock />
    </div>
    <div className={palettes?.download ? `palette-${palettes.download}` : 'palette-lightest'} >
      <DownloadAppsBlock />
    </div>
    </>
  );
};

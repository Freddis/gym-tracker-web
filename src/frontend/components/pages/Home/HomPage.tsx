import {FC} from 'react';
import {HeroBlock} from './components/HeroBlock';
import {FeaturesBlock} from './components/FeaturesBlock';
import {LatestNews} from './components/LatestNews';
import {PricingBlock} from './components/PricingBlock';
import {DownloadAppsBlock} from './components/DownloadAppsBlock';
import {CoreConceptBlock} from './components/CoreConteptBlock';

export const HomePage: FC = () => {
  return (
    <>
    <HeroBlock/>
    <div className="palette-lightest">
    <FeaturesBlock />
    </div>
    <CoreConceptBlock />
    <LatestNews />
    <div className="palette-darkest">
    <PricingBlock />
    </div>
    <DownloadAppsBlock />
    </>
  );
};

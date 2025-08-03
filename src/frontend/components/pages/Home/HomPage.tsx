import {FC} from 'react';
import {HeroBlock} from './components/HeroBlock';
import {PricingBlock} from './components/PricingBlock';
import {DownloadAppsBlock} from './components/DownloadAppsBlock';
import {ShowCaseBlock} from './components/ShowCaseBlock/ShowCaseBlock';

export const HomePage: FC = () => {
  return (
    <>
    <HeroBlock/>
    <div className="palette-lightest">
      <ShowCaseBlock/>
    {/* <FeaturesBlock /> */}
    </div>
    {/* <CoreConceptBlock />
    <LatestNews /> */}
    <div className="palette-darkest">
    <PricingBlock />
    </div>
    <DownloadAppsBlock />
    </>
  );
};

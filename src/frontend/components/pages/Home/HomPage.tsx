import {FC} from 'react';
import {HeroBlock} from './components/HeroBlock';
import {PricingBlock} from './components/PricingBlock';
import {DownloadAppsBlock} from './components/DownloadAppsBlock';
import {ShowCaseBlock} from './components/ShowCaseBlock/ShowCaseBlock';

export const HomePage: FC = () => {
  return (
    <>
    <HeroBlock/>
    <ShowCaseBlock/>
    <div className="palette-darkest">
    <PricingBlock />
    </div>
    <div className="palette-lightest">
      <DownloadAppsBlock />
    </div>
    </>
  );
};

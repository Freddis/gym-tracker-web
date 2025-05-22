import {FC} from 'react';
import {HeroBlock} from './components/HeroBlock';
import {FeaturesBlock} from './components/FeaturesBlock';
import {LatestNews} from './components/LatestNews';
import {PricingBlock} from './components/PricingBlock';
import {DownloadAppsBlock} from './components/DownloadAppsBlock';
import {CoreConceptBlock} from './components/CoreConteptBlock';

export const HomePage: FC = () => {
  return [
    <HeroBlock key={1}/>,
    <FeaturesBlock key={2}/>,
    <CoreConceptBlock key={8}/>,
    <LatestNews key={3} />,
    <PricingBlock key={4} />,
    <DownloadAppsBlock key={5}/>,
  ];
};

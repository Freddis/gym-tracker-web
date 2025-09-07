import {FC} from 'react';
import {IphoneDisplay} from '../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../components/MobileScreenContainer/MobileScreenContainer';
import {AppLogo} from '../../../../src/frontend/components/atoms/AppLogo/AppLogo';


export const SplashScreen: FC = () => (
  <IphoneDisplay tab={3} hideTabs>
   <MobileScreenContainer className="flex flex-col h-full">
    <div className="flex flex-col items-center justify-center grow">
      <div className="-mt-40 flex flex-col items-center">
        <AppLogo withText={false} className="h-20 mb-3"/>
        <h2 className="inline uppercase font-bold text-2xl ml-1 text-on-main">Discipline</h2>
      </div>
    </div>
    </MobileScreenContainer>
  </IphoneDisplay>
);

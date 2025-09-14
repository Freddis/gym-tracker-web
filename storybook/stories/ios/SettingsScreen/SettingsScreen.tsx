import {FC} from 'react';
import {IphoneDisplay} from '../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../components/MobileScreenContainer/MobileScreenContainer';
import {AppSwitch} from '../../../../src/frontend/components/atoms/AppSwitch/AppSwitch';
import {MobileBlock} from '../../../components/MobileScreenContainer/MobileBlock/MobileBlock';
import {AppLink} from '../../../../src/frontend/components/atoms/AppLink/AppLink';

export const SettingsScreen: FC = () => (
  <IphoneDisplay tab={3}>
   <MobileScreenContainer className="flex flex-col h-full">
      <MobileBlock>
      <div className="flex flex-col">
        <div className="flex">
          <div className="grow">Name:</div>
          <div>Alex Sarychev</div>
        </div>
        <div className="border-b-1 border-on-surface/15 my-3" />
        <div className="flex">
          <div className="grow">Email:</div>
          <div>alex@alex-sarychev.com</div>
        </div>
        <div className="border-b-1 border-on-surface/15 my-3" />
        <div className="flex">
          <div className="grow">Dark Mode:</div>
          <div><AppSwitch checked /></div>
        </div>
        <div className="flex flex-col items-center gap-5 mt-10">
          <AppLink>Re-Sync Data</AppLink>
          <AppLink>Sign Out</AppLink>
          </div>
      </div>
      </MobileBlock>
    </MobileScreenContainer>
  </IphoneDisplay>
);

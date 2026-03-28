import {FC, useState} from 'react';
import {AppBlock} from '../../../../../src/frontend/common/components/atoms/AppBlock/AppBlock';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {dateToEntryString} from '../../../../../src/frontend/website/utils/dateToEntryString';

export const WeightEntryAddScreen: FC<{weight?: number, date?: Date}> = (props) => {
  const [weight] = useState(props.weight ? props.weight.toString() + ' kg' : '...');
  const [date] = useState(props.date ? dateToEntryString(props.date) : 'Just now');

  return (
  <IphoneDisplay title="Add Weight Entry" tab={1} rightButton="Save">
    <MobileScreenContainer>
      <div className="flex flex-col items-start gap-5">
        <AppBlock className="flex flex-col mb-5 cursor-pointer">
          <div className="flex">
            <a className="grow">Body Weight</a>
            <span className="text-on-surface/50">{weight}</span>
          </div>
          <div className="border-b-1 border-on-main/10 pb-3 mb-3" />
          <div className="flex">
            <a className="grow">Date</a>
            <span className="text-on-surface/50">{date}</span>
          </div>
        </AppBlock>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
  );
};

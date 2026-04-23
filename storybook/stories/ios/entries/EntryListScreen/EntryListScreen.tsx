import {FC, ReactNode} from 'react';
import {FaChevronRight, FaFilter} from 'react-icons/fa6';
import {Entry, EntryType, Weight, Workout} from '../../../../../src/frontend/common/utils/openapi-client';
import {AppBlock} from '../../../../../src/frontend/common/components/atoms/AppBlock/AppBlock';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {MobileWorkoutEntryBlock} from './MobileWorkoutEntryBlock';
import {MobileWeightEntryBlock} from './MobileWeightEntryBlock';
import {AppLink} from '../../../../../src/frontend/common/components/atoms/AppLink/AppLink';
import {AppSwitch} from '../../../../../src/frontend/common/components/atoms/AppSwitch/AppSwitch';
import {AppLabel} from '../../../../../src/frontend/common/components/atoms/AppLabel/AppLabel';
interface EntryListScreenProps {
  filterOpen?: boolean;
  workout: {
    obj: Workout,
    entry: Entry,
  },
  weight: {
    obj: Weight,
    entry: Entry
  }
}
export const MobileModal: FC<{children: ReactNode | ReactNode[], button?: string}> = (props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50">
      <div className="bg-main absolute top-1/2 bottom-0 w-full p-2">
        {props.button && (
          <div className="text-right">
          <AppLink className="text-on-main right-2 text-base">{props.button}</AppLink>
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
};
export const EntryListScreen: FC<EntryListScreenProps> = ({workout, weight, filterOpen}) => (
  <IphoneDisplay tab={1}>
    <MobileScreenContainer>
      <div className="flex flex-col items-start">
        <AppBlock className="flex mb-5 cursor-pointer">
          <a className="grow">Workout Types</a>
          <FaChevronRight className="text-lg text-accent"/>
        </AppBlock>
      </div>
       <div>
          <div className="flex flex-row w-full mb-2">
            <a className="grow  text-accent flex flex-row items-center gap-2">
              <span>Entries:</span>
              <FaFilter className="text-sm"/>
            </a>
            <div className="text text-accent flex items-center">
              <span>Add</span>
            </div>
          </div>
        <div className="flex flex-col gap-3">
          <MobileWeightEntryBlock weight={weight.obj} own={true} entry={weight.entry}/>
          <MobileWorkoutEntryBlock workout={workout.obj} own={true} entry={workout.entry}/>
        </div>
      </div>
      {filterOpen && (
        <MobileModal button="Done">
          <div>
            <AppLabel>By Type:</AppLabel>
            <div className="flex flex-col mt-2 gap-2">
              {Object.values(EntryType).map((type) => (
                <AppSwitch label={type} checked={true} onCheckedChange={() => {}}/>
              ))}
            </div>
          </div>
        </MobileModal>
      )}
    </MobileScreenContainer>
  </IphoneDisplay>
);

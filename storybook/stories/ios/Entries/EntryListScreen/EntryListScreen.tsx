import {FC} from 'react';
import {FaChevronRight, FaPlus} from 'react-icons/fa6';
import {Entry, Weight, Workout} from '../../../../../src/frontend/common/utils/openapi-client';
import {AppBlock} from '../../../../../src/frontend/common/components/atoms/AppBlock/AppBlock';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {MobileWorkoutEntryBlock} from './MobileWorkoutEntryBlock';
import {MobileWeightEntryBlock} from './MobileWeightEntryBlock';
interface EntryListScreenProps {
  workout: {
    obj: Workout,
    entry: Entry,
  },
  weight: {
    obj: Weight,
    entry: Entry
  }
}
export const EntryListScreen: FC<EntryListScreenProps> = ({workout, weight}) => (
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
            <h1 className="text-lg grow">Entries:</h1>
              <div className="text text-accent flex items-center">
                <span>Add</span>
                <FaPlus className="text text-accent inline-block ml-2"/>
              </div>
          </div>
        <div className="flex flex-col gap-3">
          <MobileWeightEntryBlock weight={weight.obj} own={true} entry={weight.entry}/>
          <MobileWorkoutEntryBlock workout={workout.obj} own={true} entry={workout.entry}/>
        </div>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
);

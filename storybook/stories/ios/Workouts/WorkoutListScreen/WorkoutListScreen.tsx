import {FC} from 'react';
import {FaChevronRight, FaPlus} from 'react-icons/fa6';
import {WorkoutEntryBlock} from '../../../../../src/frontend/components/blocks/EntryBlock/components/WorkoutEntryBlock';
import {IphoneDisplay} from '../../../../components/StoryBookDisplay/components/IphoneDisplayProps/IphoneDisplay';
import {Entry, Workout} from '../../../../../src/frontend/utils/openapi-client';
import {AppBlock} from '../../../../../src/frontend/components/atoms/AppBlock/AppBlock';
import {MobileScreenContainer} from '../../../../components/StoryBookDisplay/components/MobileScreenContainer/MobileScreenContainer';

export const WorkoutListScreen: FC<{workout:Workout, entry: Entry}> = ({workout, entry}) => (
  <IphoneDisplay>
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
        <WorkoutEntryBlock workout={workout} own={true} entry={entry}/>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
);

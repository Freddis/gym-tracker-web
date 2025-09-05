import {FC} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {IphoneDisplay} from '../../../../components/StoryBookDisplay/components/IphoneDisplayProps/IphoneDisplay';
import {WorkoutType} from '../../../../../src/frontend/utils/openapi-client';
import {WorkoutTypeBlock} from '../../../../../src/frontend/components/pages/WorkoutTypes/WorkoutTypeBlock';
import {MobileScreenContainer} from '../../../../components/StoryBookDisplay/components/MobileScreenContainer/MobileScreenContainer';

export const WorkoutTypeListScreen: FC<{item:WorkoutType}> = ({item}) => (
  <IphoneDisplay title="Workout Types">
   <MobileScreenContainer>
       <div>
          <div className="flex flex-row-reverse w-full mb-2">
              <div className=" text-accent flex items-center">
                <span>Add</span>
                <FaPlus className="text-accent inline-block ml-2"/>
              </div>
          </div>
        <WorkoutTypeBlock item={item}/>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
);

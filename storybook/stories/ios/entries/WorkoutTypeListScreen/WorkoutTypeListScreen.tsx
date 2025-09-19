import {FC} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {WorkoutType} from '../../../../../src/frontend/common/utils/openapi-client';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {MobileWorkoutTypeBlock} from './MobileWorkoutTypeBlock';

export const WorkoutTypeListScreen: FC<{items:WorkoutType[]}> = ({items}) => (
  <IphoneDisplay title="Workout Types" tab={1}>
   <MobileScreenContainer>
       <div>
          <div className="flex flex-row-reverse w-full mb-2">
              <div className=" text-accent flex items-center">
                <span>Add</span>
                <FaPlus className="text-accent inline-block ml-2"/>
              </div>
          </div>
          <div className="flex flex-col gap-3">
          {items.map((workoutType) => <MobileWorkoutTypeBlock item={workoutType}/>)}
          </div>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
);

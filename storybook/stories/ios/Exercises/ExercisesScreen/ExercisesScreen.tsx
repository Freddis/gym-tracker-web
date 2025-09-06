import {FC} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {Exercise} from '../../../../../src/frontend/utils/openapi-client';
import {AppTextInput} from '../../../../../src/frontend/components/atoms/AppTextInput/AppTextInput';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {MobileExerciseBlock} from './MobileExerciseBlock';

export const ExercisesScreen: FC<{exercises: Exercise[]}> = ({exercises}) => (
  <IphoneDisplay tab={2}>
   <MobileScreenContainer className="flex flex-col h-full">
      <div className="mb-3">
        <AppTextInput placeholder="Search" className="bg-surface" />
      </div>
      <div className="flex flex-row w-full mb-3">
        <div className="text-sm grow">
          <div className="bg-cavity text-on-cavity/50  p-[1px] flex items-center w-fit gap-2 rounded-sm ">
            <div className="bg-surface text-on-surface p-1 rounded-sm cursor-pointer" >
              <h2 className="">Personal Library</h2>
            </div>
            <div className="p-1 rounded-sm cursor-pointer">
              <h2 className="">Built-In Library</h2>
            </div>
          </div>
        </div>
        <div className="text text-accent flex items-center cursor-pointer">
          <span>Add</span>
          <FaPlus className="text text-accent inline-block ml-2"/>
        </div>
      </div>

      <div className="grow overflow-y-scrol overflow-x-hidden flex flex-col gap-3">
        {exercises.map((exercise) => <MobileExerciseBlock item={exercise} />)}
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
);

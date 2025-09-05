import {FC} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {IphoneDisplay} from '../../../../components/StoryBookDisplay/components/IphoneDisplayProps/IphoneDisplay';
import {Exercise} from '../../../../../src/frontend/utils/openapi-client';
import {ExerciseBlock} from '../../../../../src/frontend/components/pages/Exercises/ExerciseLibraryPage/components/ExerciseBlock';
import {AppTextInput} from '../../../../../src/frontend/components/atoms/AppTextInput/AppTextInput';
import {MobileScreenContainer} from '../../../../components/StoryBookDisplay/components/MobileScreenContainer/MobileScreenContainer';

export const ExercisesScreen: FC<{exercises: Exercise[]}> = ({exercises}) => (
  <IphoneDisplay>
   <MobileScreenContainer>
      <div className="mb-5">
        <AppTextInput placeholder="Search" className="bg-surface" />
      </div>
      <div>
        <div className="flex flex-row w-full mb-2">
          <h1 className="text-base grow">Personal Library</h1>
          <div className="text text-accent flex items-center">
            <span>Add</span>
            <FaPlus className="text text-accent inline-block ml-2"/>
          </div>
        </div>
      {exercises.map((exercise) => <ExerciseBlock item={exercise} />)}
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
);

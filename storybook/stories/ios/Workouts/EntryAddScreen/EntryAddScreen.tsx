import {FC} from 'react';
import {FaChevronRight} from 'react-icons/fa6';
import {IphoneDisplay} from '../../../../components/StoryBookDisplay/components/IphoneDisplayProps/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/StoryBookDisplay/components/MobileScreenContainer/MobileScreenContainer';
import {AppBlock} from '../../../../../src/frontend/components/atoms/AppBlock/AppBlock';

export const EntryAddScreen: FC<{minimal: boolean}> = ({minimal = true}) => (
  <IphoneDisplay title="Add Entry">
    <MobileScreenContainer>
      <div className="flex flex-col items-start gap-5">
        <AppBlock className="flex flex-col mb-5 cursor-pointer">
          <div className="flex">
            <a className="grow">Workout</a>
            <FaChevronRight className="text-lg text-accent" />
          </div>
          <div className="border-b-1 border-on-main/10 pb-3 mb-3" />
          <div className="flex">
            <a className="grow">Weight</a>
            <FaChevronRight className="text-lg text-accent" />
          </div>
          {!minimal && (
            <>
            <div className="border-b-1 border-on-main/10 pb-3 mb-3" />
            <div className="flex">
              <a className="grow">Calories</a>
              <FaChevronRight className="text-lg text-accent" />
            </div>
            <div className="border-b-1 border-on-main/10 pb-3 mb-3" />
            <div className="flex">
              <a className="grow">Post</a>
              <FaChevronRight className="text-lg text-accent" />
            </div>
            <div className="border-b-1 border-on-main/10 pb-3 mb-3" />
            <div className="flex">
              <a className="grow">Activity</a>
              <FaChevronRight className="text-lg text-accent" />
            </div>
            <div className="border-b-1 border-on-main/10 pb-3 mb-3" />
            <div className="flex">
              <a className="grow">Measurements</a>
              <FaChevronRight className="text-lg text-accent" />
            </div>
          </>
          )}
        </AppBlock>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
);

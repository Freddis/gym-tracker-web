import {FC, useState} from 'react';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {MobileBlock} from '../../../../components/MobileScreenContainer/MobileBlock/MobileBlock';
import {AppSwitch} from '../../../../../src/frontend/common/components/atoms/AppSwitch/AppSwitch';
import {Muscle} from '../../../../../src/backend/types/Muscle';

interface ExerciseMusclesEditScreenProps {
  type: 'primary' | 'secondary';
  initialMuscles?: Muscle[];
}

export const ExerciseMusclesEditScreen: FC<ExerciseMusclesEditScreenProps> = ({
  type,
  initialMuscles = [],
}) => {
  const [selectedMuscles, setSelectedMuscles] = useState<Muscle[]>(initialMuscles);
  const muscleOptions = Object.values(Muscle).sort();

  const handleMuscleToggle = (muscle: Muscle) => {
    setSelectedMuscles((prev) => {
      if (prev.includes(muscle)) {
        return prev.filter((m) => m !== muscle);
      }
      return [...prev, muscle];
    });
  };

  const title = type === 'primary' ? 'Primary Muscles' : 'Secondary Muscles';

  return (
    <IphoneDisplay tab={2} title={title} rightButton="Save">
      <MobileScreenContainer >
        <div className="flex-1 overflow-y-auto">
          <MobileBlock>
            <div className="flex flex-col">
              {muscleOptions.map((muscle, index) => {
                const isSelected = selectedMuscles.includes(muscle);

                return (
                  <div key={muscle}>
                    <div className="flex">
                      <div className="grow">{muscle}</div>
                      <div>
                        <AppSwitch
                          checked={isSelected}
                          onCheckedChange={() => handleMuscleToggle(muscle)}
                        />
                      </div>
                    </div>
                    {index < muscleOptions.length - 1 && (
                      <div className="border-b-1 border-on-surface/15 my-3" />
                    )}
                  </div>
                );
              })}
            </div>
          </MobileBlock>
        </div>
      </MobileScreenContainer>
    </IphoneDisplay>
  );
};


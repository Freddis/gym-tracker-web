import {FC, useState} from 'react';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {AppInputError} from '../../../../../src/frontend/components/atoms/AppInputError/AppInputError';
import {AppLabel} from '../../../../../src/frontend/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../../src/frontend/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../../src/frontend/utils/i18n/useAppPartialTranslation';
import {FieldError, useResponseErrors} from '../../../../../src/frontend/utils/useResponseErrors';
import {WorkoutType} from '../../../../../src/frontend/utils/openapi-client';
import {MobileBlock} from '../../../../components/MobileScreenContainer/MobileBlock/MobileBlock';
import {AppImage} from '../../../../../src/frontend/components/atoms/AppImage/AppImage';
import {FaPlus, FaXmark} from 'react-icons/fa6';
import {AppLink} from '../../../../../src/frontend/components/atoms/AppLink/AppLink';

export const WorkoutTypeCreateScreen: FC<{type?: WorkoutType, errors?: FieldError[]}> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.workoutTypes.form);
  const {getError} = useResponseErrors(props.errors);
  const [name, setName] = useState(props.type?.name ?? '');
  return (
  <IphoneDisplay title="New Workout Type" tab={1} rightButton="Save">
    <MobileScreenContainer>
      <div className="flex flex-col items-start gap-0">
         <div className="flex flex-col items-start w-full">
            <AppLabel>{t(i18n.labels.name)}</AppLabel>
            <AppTextInput data-testid="name" onChange={(e) => setName(e.target.value)} value={name}/>
            <AppInputError error={getError('name')} />
          </div>
          {props.type?.exercises && (
            <div className="flex flex-col gap-3 w-full mb-5">
              {props.type?.exercises.map((exercise, i) => (
                <MobileBlock key={i}>
                  <div key={i} className="flex flex-col">
                    <div className="flex flex-row">
                      <h3 className="grow">{exercise.exercise.name}</h3>
                      <FaXmark className="text-lg text-accent"/>
                    </div>
                    <div key={`${i}sep`} className="border-b-1 border-on-surface/15 my-2 mb-4" />
                    <div className="flex flex-row mt-1">
                      <AppImage src={exercise.exercise.images[0]} className="mt-1 w-20 h-20" />
                      <div className="pl-5 grow flex flex-row">
                        <div className="flex flex-col gap-2 grow">
                          {exercise.sets.map((set, i) => (
                            <div>
                            <div key={i} className="flex flex-row items-center">
                              <span>{i + 1}:</span>
                              <AppTextInput className="w-15 text-center ml-2 mr-2" value={set.reps?.toString() ?? ''} />
                              <span>reps</span>
                              {i !== exercise.sets.length - 1 && (
                                <div className="grow flex flex-row-reverse">
                                <AppLink className="flex flex-row items-center gap-2"><FaXmark/></AppLink>
                                </div>
                              )}
                              {i === exercise.sets.length - 1 && (
                                <div className="grow flex flex-row-reverse">
                                <AppLink className="flex flex-row items-center gap-2">{t(i18n.buttons.addSet)}<FaPlus/></AppLink>
                                </div>
                              )}
                              </div>
                              </div>
                          ))}

                        </div>
                      </div>
                    </div>
                </div>
                </MobileBlock>
              ))}
            </div>
          )}
        <div className="flex justify-center w-full">
          <AppLink>{t(i18n.buttons.addExercise)}</AppLink>
        </div>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
  );
};

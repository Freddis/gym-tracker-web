import {FC} from 'react';
import {IphoneDisplay} from '../../../../components/IphoneDisplay/IphoneDisplay';
import {MobileScreenContainer} from '../../../../components/MobileScreenContainer/MobileScreenContainer';
import {AppTextInput} from '../../../../../src/frontend/common/components/atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../../../src/frontend/website/utils/i18n/useAppPartialTranslation';
import {FieldError} from '../../../../../src/frontend/common/utils/useResponseErrors';
import {Workout} from '../../../../../src/frontend/common/utils/openapi-client';
import {MobileBlock} from '../../../../components/MobileScreenContainer/MobileBlock/MobileBlock';
import {AppImage} from '../../../../../src/frontend/common/components/atoms/AppImage/AppImage';
import {FaPlus, FaXmark} from 'react-icons/fa6';
import {AppLink} from '../../../../../src/frontend/common/components/atoms/AppLink/AppLink';

export const WorkoutEntryAddScreen: FC<{type?: Workout, errors?: FieldError[]}> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.workoutTypes.form);
  // const {getError} = useResponseErrors(props.errors);
  return (
  <IphoneDisplay title="Workout 123" tab={1} rightButton="Finish" >
    <MobileScreenContainer>
      <MobileBlock className="flex">
      <div className="grow">Time:</div>
      <div>00:00:13</div>
      </MobileBlock>
      <div className="flex flex-col items-start gap-0 mt-5">
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
                      <div className="pl-2 grow flex flex-row">
                        <div className="flex flex-col gap-2 grow">
                          {exercise.sets.map((set, i) => (
                            <div>
                            <div key={i} className="flex flex-row items-center">
                              <span>{i + 1}:</span>
                              <AppTextInput className="w-15 text-center ml-2 mr-2" value={set.reps?.toString() ?? ''} />
                              <span>x</span>
                               <AppTextInput className="w-15 text-center ml-2 mr-2" value={set.reps?.toString() ?? ''} />
                              {i !== exercise.sets.length - 1 && (
                                <div className="grow flex flex-row-reverse">
                                <AppLink className="flex flex-row items-center gap-2"><FaXmark/></AppLink>
                                </div>
                              )}
                              {i === exercise.sets.length - 1 && (
                                <div className="grow flex flex-row-reverse">
                                <AppLink className="flex flex-row items-center gap-2"><FaXmark/></AppLink>
                                </div>
                              )}
                              </div>
                              </div>
                          ))}

                        </div>
                      </div>
                    </div>
                    <div key={`${i}sep`} className="border-b-1 border-on-surface/15 my-4" />
                    <div className="flex justify-center">
                    <AppLink className="flex flex-row items-center gap-2">{t(i18n.buttons.addSet)}<FaPlus/></AppLink>
                    </div>
                </div>
                </MobileBlock>
              ))}
            </div>
          )}
        <div className="flex justify-center w-full my-5">
          <AppLink>{t(i18n.buttons.addExercise)}</AppLink>
        </div>
      </div>
    </MobileScreenContainer>
  </IphoneDisplay>
  );
};

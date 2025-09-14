import {FC, useContext, ChangeEvent} from 'react';
import {WorkoutExerciseUpdateFormProps} from './types/WorkoutExerciseUpdateFormProps';
import {AppButton} from '../../../../../../atoms/AppButton/AppButton';
import {AppTextInput} from '../../../../../../atoms/AppTextInput/AppTextInput';
import {PopupContext} from '../../../../../../atoms/Popup/PopupContext';
import {Exercise, WorkoutExerciseSet, WorkoutExerciseSetUpdateDto} from '../../../../../../../utils/openapi-client';
import {AppImage} from '../../../../../../atoms/AppImage/AppImage';
import {ExerciseSelectionPopup} from '../../../../../../blocks/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {useAppPartialTranslation} from '../../../../../../../utils/i18n/useAppPartialTranslation';
import {FaX} from 'react-icons/fa6';
import {useAtom} from 'jotai';
import {AppInputError} from '../../../../../../atoms/AppInputError/AppInputError';
import {useResponseErrors} from '../../../../../../../utils/useResponseErrors';
import {RouteLink} from '../../../../../../atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../../../utils/route';

export const WorkoutExerciseUpdateForm: FC<WorkoutExerciseUpdateFormProps> = (props) => {
  const popupContext = useContext(PopupContext);
  const {getSmartError} = useResponseErrors(props.errors);
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.workouts.update);
  const [workoutExercise, setWorkoutExercise] = useAtom(props.item);
  const finalizeExerciseSwap = (selected: Exercise) => {
    popupContext.setContent(null);
    setWorkoutExercise({
      ...workoutExercise,
      exercise: selected,
    });
  };
  const popup = <ExerciseSelectionPopup onSelect={finalizeExerciseSwap}/>;
  const swapExercise = () => {
    popupContext.setContent(popup);
  };
  const deleteExercise = () => {
    props.onDelete(workoutExercise);
  };
  const addSet = () => {
    const set: WorkoutExerciseSet = {
      start: new Date(),
      end: new Date(),
      weight: null,
      reps: null,
    };
    setWorkoutExercise({
      ...workoutExercise,
      sets: [...workoutExercise.sets, set],
    });
  };
  const deleteSet = (set: WorkoutExerciseSetUpdateDto) => {
    setWorkoutExercise({
      ...workoutExercise,
      sets: workoutExercise.sets.filter((x) => x !== set),
    });
  };
  const updateSetWeight = (set: WorkoutExerciseSetUpdateDto, e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    let strValue = e.target.value;
    if (strValue.endsWith('.')) {
      strValue = strValue.replace('.', '.0');
    }
    const value = !isNaN(Number(strValue)) ? Number(strValue) : 0;

    const targetSet = workoutExercise.sets.find((x) => x === set);
    if (!targetSet) {
      return;
    }

    targetSet.weight = value;
    setWorkoutExercise({...workoutExercise});
  };
  const updateSetReps = (set: WorkoutExerciseSetUpdateDto, e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const value = !isNaN(Number(e.target.value)) ? Number(e.target.value) : 0;
    const targetSet = workoutExercise.sets.find((x) => x === set);
    if (!targetSet) {
      return;
    }
    targetSet.reps = value;
    setWorkoutExercise({...workoutExercise});
  };

  const exercise = workoutExercise.exercise;
  return (
    <div>
      <div className="pb-5 flex flex-row">
        <AppImage className="w-25 h-25 mt-1" key={exercise.images[0]} src={exercise.images[0]} />
        <div className="pl-5 grow">
          <div className="flex flex-row">
            <RouteLink className="text-on-surface" to={route(RouteId.Exercise)} params={{exerciseId: exercise.id.toString()}} >
              <b>{exercise.name}</b>
            </RouteLink>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={deleteExercise} >
                {translations.utils.generic.buttons.delete}
              </AppButton>
              <AppButton onClick={swapExercise}>{t(i18n.buttons.swapExercise)}</AppButton>
            </div>
          </div>
          <div>
            {workoutExercise.sets.map((set, i) => (
              <div key={i} className="mb-5 ">
                <div className="flex flex-row gap-3 items-center">
                  <span>{i + 1}:</span>
                  <AppTextInput
                    onChange={(e) => updateSetWeight(set, e)}
                    value={(set.weight ?? 0).toString()}
                    className="w-15 text-center"
                  />
                  <span><FaX className="text-xs" /></span>
                  <AppTextInput
                    onChange={(e) => updateSetReps(set, e)}
                    value={(set.reps ?? 0).toString()}
                    className="w-15 text-center"
                  />
                  <AppButton onClick={() => deleteSet(set)}>
                    {translations.utils.generic.buttons.delete}
                  </AppButton>
                </div>
                <AppInputError className="max-w-full" error={getSmartError((x) => x.sets[i]?.reps)} />
              </div>
            ))}
            <AppButton onClick={addSet}>{t(i18n.buttons.addSet)}</AppButton>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5 border-b-1 border-neutral-on-surface"/>
    </div>
  );
};

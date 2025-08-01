import {FC, useContext, useState, ChangeEvent} from 'react';
import {UpdateWorkoutExerciseFormProps} from './types/UpdateWorkoutExerciseFormProps';
import {AppButton} from '../../../../../atoms/AppButton/AppButton';
import {AppTextInput} from '../../../../../atoms/AppTextInput/AppTextInput';
import {ExerciseSelectionPopup} from '../../../../../atoms/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {PopupContext} from '../../../../../atoms/Popup/PopupContext';
import {Exercise, WorkoutUpdateDto, WorkoutExerciseSet, WorkoutExerciseSetUpdateDto} from '../../../../../../utils/openapi-client';
import {AppImage} from '../../../../../atoms/AppImage/AppImage';

export const UpdateWorkoutExerciseForm: FC<UpdateWorkoutExerciseFormProps> = (props) => {
  const popupContext = useContext(PopupContext);
  const [workoutExercise, setWorkoutExercise] = useState(props.item.workoutExercise);
  const [exercise, setExercise] = useState(props.item.exercise);
  const finalizeExerciseSwap = (selected: Exercise) => {
    popupContext.setContent(null);
    props.item.workoutExercise.exerciseId = selected.id;
    setWorkoutExercise({...props.item.workoutExercise});
    setExercise({...selected});
  };
  const popup = <ExerciseSelectionPopup onSelect={finalizeExerciseSwap}/>;
  const swapExercise = () => {
    popupContext.setContent(popup);
  };
  const deleteExercise = (exercise: WorkoutUpdateDto['exercises'][0]) => {
    props.onDelete(exercise);
  };
  const addSet = () => {
    const set: WorkoutExerciseSet = {
      start: new Date(),
      end: new Date(),
      weight: null,
      reps: null,
      id: 0,
      exerciseId: 0,
      workoutId: 0,
      userId: 0,
      workoutExerciseId: 0,
      createdAt: new Date(),
      updatedAt: null,
    };
    props.item.workoutExercise.sets.push(set);
    setWorkoutExercise({...props.item.workoutExercise});
  };
  const deleteSet = (set: WorkoutExerciseSetUpdateDto) => {
    props.item.workoutExercise.sets = props.item.workoutExercise.sets.filter((x) => x !== set); ;
    setWorkoutExercise({...props.item.workoutExercise});
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
  return (
    <div>
      <div className="pb-5 flex flex-row">
        <AppImage className="w-25 h-25 mt-1" key={exercise.images[0]} src={exercise.images[0]} />
        <div className="pl-5 grow">
          <div className="flex flex-row">
            <b>{exercise.name}</b>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={() => deleteExercise(props.item.workoutExercise)} color={'error'}>Delete</AppButton>
              <AppButton onClick={swapExercise}>Change</AppButton>
            </div>
          </div>
          <div>
            {workoutExercise.sets.map((set, i) => (
              <div key={i} className="mb-5 flex flex-row gap-3 items-center">
                <span>{i + 1}:</span>
                <AppTextInput
                  onChange={(e) => updateSetWeight(set, e)}
                  value={(set.weight ?? 0).toString()}
                  className="w-15 text-center"
                />
                <span>x</span>
                <AppTextInput
                  onChange={(e) => updateSetReps(set, e)}
                  value={(set.reps ?? 0).toString()}
                  className="w-15 text-center"
                />
                <AppButton onClick={() => deleteSet(set)} color={'error'}>Delete</AppButton>
              </div>
            ))}
            <AppButton onClick={addSet}>Add Set</AppButton>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5 border-b-1 border-neutral-on-surface"/>
    </div>
  );
};

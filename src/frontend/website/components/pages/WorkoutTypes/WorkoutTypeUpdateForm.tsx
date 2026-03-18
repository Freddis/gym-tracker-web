import {ChangeEventHandler, FC, useContext, useEffect, useMemo, useState} from 'react';
import {Exercise, WorkoutType, WorkoutTypeExercise} from '../../../../common/utils/openapi-client';
import {AppLabel} from '../../../../common/components/atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../../../common/components/atoms/AppTextInput/AppTextInput';
import {AppButton} from '../../../../common/components/atoms/AppButton/AppButton';
import {PopupContext} from '../../../../common/components/atoms/Popup/PopupContext';
import {WorkoutTypeExerciseUpdateForm} from './WorkoutTypeExerciseUpdateForm';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {ExerciseSelectionPopup} from '../../blocks/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {useNonRenderingState} from '../../../../common/utils/useNonRenderingState';

type Updated<T> = Omit<T, 'id'>
interface WorkoutTypeUpdateFormProps {
  item: Updated<WorkoutType>
  onUpdate: (dto: Updated<WorkoutType>) => void
}

export const WorkoutTypeUpdateForm: FC<WorkoutTypeUpdateFormProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.workoutTypes.form);
  const [name, setName] = useState(props.item.name ?? '');
  const [description, setDescription] = useState(props.item.description ?? '');
  const popupContext = useContext(PopupContext);
  const [exercises, setExercises] = useNonRenderingState<WorkoutTypeExercise[]>(props.item.exercises, () => {
    props.onUpdate({
      ...props.item,
      exercises,
    });
  });
  useEffect(() => {
    props.onUpdate({
      ...props.item,
      name,
      description,
      exercises,
    });
  }, [name, description]);
  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const onDescriptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDescription(e.target.value);
  };
  const addExerciseButtonClicked = () => {
    popupContext.setContent(<ExerciseSelectionPopup onSelect={addExercise}/>);
  };
  const addExercise = (exercise: Exercise) => {
    const maxIndex = exercises[exercises.length - 1]?.index ?? 0;
    const row: WorkoutTypeExercise = {
      exercise,
      index: maxIndex + 100,
      sets: [],
    };
    const newExercises = [...exercises, row];
    setExercises(newExercises, true);
    popupContext.setContent(null);
  };
  const deleteExercise = (exercise: WorkoutTypeExercise) => {
    const newExercises = [...exercises.filter((x) => x !== exercise)];
    setExercises(newExercises, true);
  };
  const updateExercise = (exercise: WorkoutTypeExercise) => {
    const newExercises = exercises.map((e) => e.index === exercise.index ? exercise : e);
    setExercises(newExercises);
  };
  const renderedExercises = useMemo(() => {
    return exercises.map((exercise) => (
      <WorkoutTypeExerciseUpdateForm key={exercise.index} item={exercise} onDelete={deleteExercise} onUpdate={updateExercise} />
    ));
  }, [exercises]);
  return (
    <>
      <div className="mb-5 flex flex-col items-start justify-start">
        <AppLabel>{t(i18n.labels.name)}</AppLabel>
        <AppTextInput onChange={onNameChange} value={name}/>
      </div>
      <div className="mb-5 flex flex-col items-start">
        <AppLabel >{t(i18n.labels.description)}</AppLabel>
        <AppTextInput onChange={onDescriptionChange} value={description}/>
      </div>
      <div>
        {renderedExercises}
      </div>
      <AppButton onClick={addExerciseButtonClicked}>{t(i18n.buttons.addExercise)}</AppButton>
    </>
  );
};

import {ChangeEventHandler, FC, useContext, useState} from 'react';
import {Exercise, WorkoutType, WorkoutTypeExercise} from '../../../utils/openapi-client';
import {AppLabel} from '../../atoms/AppLabel/AppLabel';
import {AppTextInput} from '../../atoms/AppTextInput/AppTextInput';
import {AppButton} from '../../atoms/AppButton/AppButton';
import {PopupContext} from '../../atoms/Popup/PopupContext';
import {WorkoutTypeExerciseUpdateForm} from './WorkoutTypeExerciseUpdateForm';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';
import {ExerciseSelectionPopup} from '../../blocks/ExerciseSelectionPopup/ExerciseSelectionPopup';

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
  const [exercises, setExercises] = useState<WorkoutTypeExercise[]>(props.item.exercises);
  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    notify({name: e.target.value});
  };
  const onDescriptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDescription(e.target.value);
    notify({description: e.target.value});
  };

  const notify = (update: Partial<WorkoutType>) => {
    props.onUpdate({
      ...props.item,
      name,
      description,
      ...update,
    });
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
    setExercises(newExercises);
    popupContext.setContent(null);
    notify({exercises: newExercises});
  };
  const deleteExercise = (exercise: WorkoutTypeExercise) => {
    const newExercises = [...exercises.filter((x) => x !== exercise)];
    setExercises(newExercises);
    notify({exercises: newExercises});
  };
  const updateExercise = (exercise: WorkoutTypeExercise) => {
    const newExercises = exercises.map((e) => e.index === exercise.index ? exercise : e);
    setExercises(newExercises);
    notify({exercises: newExercises});
  };

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
        {exercises.map((exercise) => (
          <WorkoutTypeExerciseUpdateForm key={exercise.index} item={exercise} onDelete={deleteExercise} onUpdate={updateExercise} />
        ))}
      </div>
      <AppButton onClick={addExerciseButtonClicked}>{t(i18n.buttons.addExercise)}</AppButton>
    </>
  );
};

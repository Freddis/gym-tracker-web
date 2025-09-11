import {FC, useState, ChangeEvent} from 'react';
import {WorkoutTypeExercise, WorkoutTypeExerciseSet} from '../../../utils/openapi-client';
import {AppImage} from '../../atoms/AppImage/AppImage';
import {AppButton} from '../../atoms/AppButton/AppButton';
import {AppTextInput} from '../../atoms/AppTextInput/AppTextInput';
import {useAppPartialTranslation} from '../../../utils/i18n/useAppPartialTranslation';

interface WorkoutTypeExerciseUpdateFormProps {
  item: WorkoutTypeExercise
  onDelete: (item: WorkoutTypeExercise) => void
  onUpdate: (item: WorkoutTypeExercise) => void
}

export const WorkoutTypeExerciseUpdateForm: FC<WorkoutTypeExerciseUpdateFormProps> = (props) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.workoutTypes.form);
  const [workoutTypeExercise, setWorkoutExercise] = useState(props.item);
  const [exercise] = useState(props.item.exercise);
  const deleteExercise = () => {
    props.onDelete(props.item);
  };
  const addSet = () => {
    const set: WorkoutTypeExerciseSet = {
      reps: 0,
    };
    const update: WorkoutTypeExercise = {
      ...workoutTypeExercise,
      sets: [...workoutTypeExercise.sets, set],
    };
    setWorkoutExercise(update);
    props.onUpdate(update);
  };

  const deleteSet = (set: WorkoutTypeExerciseSet) => {
    const update: WorkoutTypeExercise = {
      ...workoutTypeExercise,
      sets: workoutTypeExercise.sets.filter((x) => x !== set),
    };
    setWorkoutExercise(update);
    props.onUpdate(update);
  };

  const updateSetReps = (set: WorkoutTypeExerciseSet, e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const value = !isNaN(Number(e.target.value)) ? Number(e.target.value) : 0;
    const updatedSets = workoutTypeExercise.sets.map(
      (s) => s === set ? {...s, reps: value} : s
    );
    const updatedWorkoutTypeExercise = {...workoutTypeExercise, sets: updatedSets};
    setWorkoutExercise(updatedWorkoutTypeExercise);
    props.onUpdate(updatedWorkoutTypeExercise);
  };
  return (
    <div>
      <div className="pb-5 flex flex-row">
        <AppImage className="w-25 h-25 mt-1" key={exercise.images[0]} src={exercise.images[0]} />
        <div className="pl-5 grow">
          <div className="flex flex-row">
            <b>{exercise.name}</b>
            <div className="grow flex flex-row-reverse gap-2">
              <AppButton onClick={deleteExercise} color={'error'}>{t(i18n.buttons.deleteExercise)}</AppButton>
            </div>
          </div>
          <div>
            {workoutTypeExercise.sets.map((set, i) => (
              <div key={i} className="mb-5 flex flex-row gap-3 items-center">
                <span>{i + 1}:</span>
                <AppTextInput
                  onChange={(e) => updateSetReps(set, e)}
                  value={(set.reps ?? 0).toString()}
                  className="w-15 text-center"
                />
                <AppButton onClick={() => deleteSet(set)} color={'error'}>{t(i18n.buttons.deleteSet)}</AppButton>
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

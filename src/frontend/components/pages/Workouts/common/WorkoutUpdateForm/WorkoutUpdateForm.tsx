import {FC, useState, useContext, useEffect} from 'react';
import {AppTextInput} from '../../../../atoms/AppTextInput/AppTextInput';
import {AppButton} from '../../../../atoms/AppButton/AppButton';
import {PopupContext} from '../../../../atoms/Popup/PopupContext';
import {Conditional} from '../../../../layout/Header/Header';
import {AppLabel} from '../../../../atoms/AppLabel/AppLabel';
import {Workout, WorkoutUpdateDto, Exercise, getWorkoutTypes, WorkoutExercise} from '../../../../../utils/openapi-client';
import {WorkoutExerciseUpdateForm} from './components/WorkoutUpdateForm/WorkoutExerciseUpdateForm';
import {AppCombobox} from '../../../../atoms/AppCombobox/AppCombobox';
import {useQuery} from '@tanstack/react-query';
import {ComboValue} from '../../../../atoms/AppCombobox/types/ComboValue';
import {ExerciseSelectionPopup} from '../../../../blocks/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';

export const WorkoutUpdateForm: FC<{item: Omit<Workout, 'id'>, onUpdate: (dto: WorkoutUpdateDto) => void }> = (props) => {
  const popupContext = useContext(PopupContext);
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.workouts.update);
  const [item, setItem] = useState<WorkoutUpdateDto>({
    ...props.item,
    exercises: props.item.exercises.map((x) => ({
      exerciseId: x.exercise.id,
      sets: x.sets,
    })),
  });
  const [exercises, setExercises] = useState<WorkoutExercise[]>(props.item.exercises);

  const response = useQuery({
    queryFn: () => getWorkoutTypes(),
    queryKey: [],
  });
  const setStart = (start: Date) => {
    setItem({
      ...item,
      start,
    });
  };
  const setEnd = (end: Date) => {
    setItem({
      ...item,
      end,
    });
  };

  useEffect(() => {
    const newItem: WorkoutUpdateDto = {
      exercises: exercises.map((x) => ({
        exerciseId: x.exercise.id,
        sets: x.sets,
      })),
      typeId: item.typeId,
      calories: item.calories,
      start: item.start,
      end: item.end,
    };
    props.onUpdate(newItem);
  }, [item, exercises]);


  const setCaloriesFromString = (calories: string) => {
    const value = !isNaN(Number(calories)) ? Number(calories) : 0;
    setItem({
      ...item,
      calories: value,
    });
  };
  const deleteExercise = (row: WorkoutExercise) => {
    const filtered = exercises.filter((x) => x !== row);
    setExercises(filtered);
  };
  const updateExercise = (row: WorkoutExercise) => {
    const filtered = exercises.filter((x) => x !== row);
    setExercises([
      ...filtered,
      row,
    ]);
  };
  const showAddExercisePopup = () => {
    popupContext.setContent(<ExerciseSelectionPopup onSelect={addExercise}/>);
  };
  const addExercise = (exercise: Exercise) => {
    const workoutExercise: WorkoutExercise = {
      exercise,
      sets: [{
        start: new Date(),
        end: new Date(),
        weight: 0,
        reps: 1,
      }],
    };
    setExercises([...exercises, {...workoutExercise}]);
    popupContext.setContent(null);
  };
  const workoutTypesValues: ComboValue[] = response.data?.data?.items.map((type) => ({
    label: type.name ?? 'Nothing',
    onSelect: (selected) => {
      if (!selected) {
        setItem({
          ...item,
          typeId: null,
        });
        return;
      }
      setItem({
        ...item,
        typeId: type.id,
      });
    },
  })) ?? [];
  const selectedType = response.data?.data?.items.find((x) => x.id === item.typeId) ?? null;
  return (
    <>
      <div className="mb-5 flex flex-row items-center">
        <AppLabel className="w-20">{translations.utils.objects.workout.fields.typeId}</AppLabel>
        <AppCombobox
          placeholder={'Find Workout type'}
          defaultValue={'Select workout type'}
          notFound={'No types found'}
          values={workoutTypesValues}
          selected={selectedType?.name}
        />
      </div>
      <div className="mb-5 flex flex-row items-center">
        <AppLabel className="w-20">{translations.utils.objects.workout.fields.start}</AppLabel>
        <AppTextInput className="w-60 text-center" onChange={(e) => setStart(new Date(e.target.value))} value={item.start.toISOString()}/>
      </div>
      <div className="mb-5 flex flex-row items-center">
        <AppLabel className="w-20">{translations.utils.objects.workout.fields.end}</AppLabel>
        <AppTextInput className="w-60 text-center" onChange={(e) => setEnd(new Date(e.target.value))} value={item.end?.toISOString()}/>
      </div>
      <div className="mb-5 flex flex-row items-center">
        <AppLabel className="w-20">{translations.utils.objects.workout.fields.calories}</AppLabel>
        <AppTextInput className="w-20 text-center" onChange={(e) => setCaloriesFromString(e.target.value)} value={item.calories} />
      </div>
      <Conditional condition={exercises.length > 0}>
        <div>
          <AppLabel>{t(i18n.labels.exercises)}</AppLabel>
        </div>
      </Conditional>
      <div className="mt-3">
        {exercises.map((row, i) => (
          <WorkoutExerciseUpdateForm key={i} item={row} onDelete={deleteExercise} onUpdate={updateExercise} />
          ))}
        <div className="flex justify-center">
          <AppButton onClick={showAddExercisePopup}>{t(i18n.buttons.addExercise)}</AppButton>
        </div>
      </div>
    </>
  );
};

import {FC, useContext} from 'react';
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
import {useNonRenderingState} from '../../../../../utils/useNonRenderingState';

export const WorkoutUpdateForm: FC<{item: Omit<Workout, 'id'>, onUpdate: (dto: WorkoutUpdateDto) => void }> = (props) => {
  const popupContext = useContext(PopupContext);
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.workouts.update);
  const notify = () => {
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
  };

  const [item, setItem] = useNonRenderingState<WorkoutUpdateDto>({
    ...props.item,
    exercises: props.item.exercises.map((x) => ({
      exerciseId: x.exercise.id,
      sets: x.sets,
    })),
  }, notify);
  const [exercises, setExercises] = useNonRenderingState<WorkoutExercise[]>(props.item.exercises, notify);
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

  const setCaloriesFromString = (calories: string) => {
    const value = !isNaN(Number(calories)) ? Number(calories) : 0;
    setItem({
      ...item,
      calories: value,
    }, true);
  };
  const deleteExercise = (index:number) => {
    const filtered = exercises.filter((_, i) => i !== index);
    setExercises(filtered, true);
  };
  const updateExercise = (index: number, newObj: WorkoutExercise) => {
    const newExercises = exercises.map((existing, i) =>
      i === index ? newObj : existing
    );
    setExercises(newExercises);
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
    setExercises([...exercises, workoutExercise], true);
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
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[auto_auto_1fr] sm:gap-5 mb-5">
        <AppLabel>{translations.utils.objects.workout.fields.typeId}</AppLabel>
        <AppCombobox
          className="max-w-full"
          placeholder={'Find Workout type'}
          defaultValue={'Select workout type'}
          notFound={'No types found'}
          values={workoutTypesValues}
          selected={selectedType?.name}
        />
        <div/>
        <AppLabel>{translations.utils.objects.workout.fields.start}</AppLabel>
        <AppTextInput
         className="max-w-full" size={24} onChange={(e) => setStart(new Date(e.target.value))} value={item.start.toISOString()}/>
        <div/>
        <AppLabel>{translations.utils.objects.workout.fields.end}</AppLabel>
        <AppTextInput
        className="max-w-full w-auto" size={24} onChange={(e) => setEnd(new Date(e.target.value))} value={item.end?.toISOString()}/>
        <div/>
        <AppLabel>{translations.utils.objects.workout.fields.calories}</AppLabel>
        <AppTextInput className="w-20 max-w-full" onChange={(e) => setCaloriesFromString(e.target.value)} value={item.calories} />
        <div/>
      </div>
      <Conditional condition={exercises.length > 0}>
        <div>
          <AppLabel>{t(i18n.labels.exercises)}</AppLabel>
        </div>
      </Conditional>
      <div className="mt-3">
        {exercises.map((row, i) => (
          <WorkoutExerciseUpdateForm
            key={Math.random()}
            item={row}
            onDelete={() => deleteExercise(i)}
            onUpdate={(o) => updateExercise(i, o)}
          />
          ))}
        <div className="flex justify-center">
          <AppButton onClick={showAddExercisePopup}>{t(i18n.buttons.addExercise)}</AppButton>
        </div>
      </div>
    </>
  );
};

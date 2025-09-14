import {FC, useContext, useEffect, useMemo} from 'react';
import {AppTextInput} from '../../../../atoms/AppTextInput/AppTextInput';
import {AppButton} from '../../../../atoms/AppButton/AppButton';
import {PopupContext} from '../../../../atoms/Popup/PopupContext';
import {Conditional} from '../../../../layout/Header/Header';
import {AppLabel} from '../../../../atoms/AppLabel/AppLabel';
import {Workout, WorkoutUpdateDto, Exercise, getWorkoutTypes, WorkoutExercise} from '../../../../../utils/openapi-client';
import {WorkoutExerciseUpdateForm} from './components/WorkoutExerciseUpdateForm/WorkoutExerciseUpdateForm';
import {AppCombobox} from '../../../../atoms/AppCombobox/AppCombobox';
import {useQuery} from '@tanstack/react-query';
import {ComboValue} from '../../../../atoms/AppCombobox/types/ComboValue';
import {ExerciseSelectionPopup} from '../../../../blocks/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {atom, getDefaultStore, useSetAtom} from 'jotai';
import {usePropAtom} from '../../../../../utils/usePropAtom';
import {ErrorSlice, useResponseErrors} from '../../../../../utils/useResponseErrors';
import {AppInputError} from '../../../../atoms/AppInputError/AppInputError';
import {AppDatepicker} from '../../../../atoms/AppDatepicker/AppDatepicker';
import {useSplitAtom} from '../../../../../utils/useSplitAtom';

interface WorkoutUpdateFormProps {
  item: Omit<Workout, 'id'>
  onUpdate: (dto: WorkoutUpdateDto) => void
  errors?: ErrorSlice<WorkoutUpdateDto>
}

export const WorkoutUpdateForm: FC<WorkoutUpdateFormProps> = (props) => {
  const popupContext = useContext(PopupContext);
  const {getSmartError, sliceErrors} = useResponseErrors<WorkoutUpdateDto>(props.errors);
  const workoutAtom = useMemo(() => atom(props.item), []);
  const exerciseAtoms = useSplitAtom(workoutAtom, (x) => x.exercises);
  const setJotaiItem = useSetAtom(workoutAtom);
  const [calories, setCalories] = usePropAtom(workoutAtom, 'calories');
  const [workoutTypeId, setWorkoutTypeId] = usePropAtom(workoutAtom, 'typeId');
  const [start, setStart] = usePropAtom(workoutAtom, 'start');
  const [end, setEnd] = usePropAtom(workoutAtom, 'end');
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.workouts.update);
  const response = useQuery({
    queryFn: () => getWorkoutTypes(),
    queryKey: [],
  });
  useEffect(() => {
    notify();
    const unsubscribe = getDefaultStore().sub(workoutAtom, notify);
    return () => {
      unsubscribe();
    };
  }, [workoutAtom]);

  const setCaloriesFromString = (calories: string) => {
    const value = !isNaN(Number(calories)) ? Number(calories) : 0;
    setCalories(value);
  };
  const deleteExercise = (index:number) => {
    setJotaiItem((x) => ({
      ...x,
      exercises: x.exercises.filter((_, i) => i !== index),
    }));
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
    setJotaiItem((x) => ({
      ...x,
      exercises: [...x.exercises, workoutExercise],
    }));
    popupContext.setContent(null);
  };
  const notify = () => {
    const item = getDefaultStore().get(workoutAtom);
    const newItem: WorkoutUpdateDto = {
      exercises: item.exercises.map((x) => ({
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

  const workoutTypesValues: ComboValue[] = response.data?.data?.items.map((type) => ({
    label: type.name ?? 'Nothing',
    onSelect: (selected) => {
      if (!selected) {
        setWorkoutTypeId(null);
        return;
      }
      setWorkoutTypeId(type.id);
    },
  })) ?? [];
  const selectedType = response.data?.data?.items.find((x) => x.id === workoutTypeId) ?? null;
  return (
    <>
      <div className="grid grid-cols-1 gap-x-2 gap-y-0 sm:grid-cols-[auto_auto_1fr] items-start sm:gap-x-5  mb-5">
        <AppLabel>{translations.utils.objects.workout.fields.typeId}</AppLabel>
        <div className="relative">
          <AppCombobox
            className="max-w-full"
            placeholder={t(i18n.labels.findWorkoutType)}
            defaultValue={t(i18n.labels.selectWorkoutType)}
            notFound={t(i18n.labels.noWorkoutTypesFound)}
            values={workoutTypesValues}
            selected={selectedType?.name}
          />
          <AppInputError className="w-[327px] max-w-full " error={getSmartError((x) => x.typeId)} />
        </div>
        <div/>
        <AppLabel>{translations.utils.objects.workout.fields.start}</AppLabel>
        <div className="relative">
          <AppDatepicker value={start} onChange={setStart}/>
          <AppInputError className="w-[327px] max-w-full " error={getSmartError((x) => x.start)} />
        </div>
        <div/>
        <AppLabel>{translations.utils.objects.workout.fields.end}</AppLabel>
        <div className="relative">
          <AppDatepicker value={end ?? undefined} onChange={setEnd} />
          <AppInputError className="w-[327px] max-w-full " error={getSmartError((x) => x.end)} />
        </div>
        <div/>
        <AppLabel>{translations.utils.objects.workout.fields.calories}</AppLabel>
        <div className="relative">
          <AppTextInput className="w-20 max-w-full" onChange={(e) => setCaloriesFromString(e.target.value)} value={calories} />
          <AppInputError className="w-[327px] max-w-full " error={getSmartError((x) => x.exercises)} />
        </div>
        <div/>
      </div>
      <Conditional condition={exerciseAtoms.length > 0}>
        <div>
          <AppLabel>{t(i18n.labels.exercises)}</AppLabel>
        </div>
      </Conditional>
      <div className="mt-3">
        {useMemo(() => exerciseAtoms.map((row, i) => (
          <WorkoutExerciseUpdateForm
            key={Math.random()}
            item={row}
            onDelete={() => deleteExercise(i)}
            errors={sliceErrors(props.errors, (x) => x.exercises[i])}
          />
          )), [exerciseAtoms, props.errors])}
        <div className="flex justify-center">
          <AppButton onClick={showAddExercisePopup}>{t(i18n.buttons.addExercise)}</AppButton>
        </div>
      </div>
    </>
  );
};

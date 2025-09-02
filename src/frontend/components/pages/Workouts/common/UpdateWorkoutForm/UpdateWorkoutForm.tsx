import {FC, useState, useContext, useEffect} from 'react';
import {AppTextInput} from '../../../../atoms/AppTextInput/AppTextInput';
import {AppButton} from '../../../../atoms/AppButton/AppButton';
import {PopupContext} from '../../../../atoms/Popup/PopupContext';
import {ExerciseSelectionPopup} from '../../../../atoms/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {Conditional} from '../../../../layout/Header/Header';
import {AppLabel} from '../../../../atoms/AppLabel/AppLabel';
import {Workout, WorkoutUpdateDto, Exercise, getWorkoutTypes} from '../../../../../utils/openapi-client';
import {UpdateWorkoutExerciseFormExercrise} from './components/UpdateWorkoutExerciseForm/types/UpdateWorkoutExerciseFormExercrise';
import {UpdateWorkoutExerciseForm} from './components/UpdateWorkoutExerciseForm/UpdateWorkoutExerciseForm';
import {AppCombobox} from '../../../../atoms/AppCombobox/AppCombobox';
import {useQuery} from '@tanstack/react-query';
import {ComboValue} from '../../../../atoms/AppCombobox/types/ComboValue';

export const UpdateWorkoutForm: FC<{item: Omit<Workout, 'id'>, onUpdate: (dtd: WorkoutUpdateDto) => void }> = (props) => {
  const popupContext = useContext(PopupContext);
  const [item, setItem] = useState<WorkoutUpdateDto>(props.item);
  const [exercises, setExercises] = useState<UpdateWorkoutExerciseFormExercrise[]>(() => {
    return props.item.exercises.map((x) => ({
      exercise: x.exercise,
      workoutExercise: {
        ...x,
      },
    }));
  });
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
      exercises: exercises.map((x) => x.workoutExercise),
      typeId: item.typeId,
      calories: item.calories,
      start: item.start,
      end: item.end,
      deletedAt: item.deletedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
    console.log(newItem);
    props.onUpdate(newItem);
  }, [item, exercises]);


  const setCaloriesFromString = (calories: string) => {
    const value = !isNaN(Number(calories)) ? Number(calories) : 0;
    setItem({...props.item, calories: value});
  };
  const deleteExercise = (row: WorkoutUpdateDto['exercises'][0]) => {
    const filtered = exercises.filter((x) => x.workoutExercise !== row);
    setExercises(filtered);
  };
  const showAddExercisePopup = () => {
    popupContext.setContent(<ExerciseSelectionPopup onSelect={addExercise}/>);
  };
  const addExercise = (exercise: Exercise) => {
    const workoutExercise: WorkoutUpdateDto['exercises'][0] = {
      exerciseId: exercise.id,
      sets: [{
        start: new Date(),
        end: new Date(),
        weight: 0,
        reps: 1,
        createdAt: new Date(),
        updatedAt: null,
      }],
    };
    setExercises([...exercises, {workoutExercise, exercise}]);
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
        <AppLabel className="w-20">Type</AppLabel>
        <AppCombobox
          placeholder={'Find Workout type'}
          defaultValue={selectedType?.name ?? 'Select workout type'}
          notFound={'No types found'}
          values={workoutTypesValues}
        />
      </div>
      <div className="mb-5 flex flex-row items-center">
        <AppLabel className="w-20">Started</AppLabel>
        <AppTextInput className="w-60 text-center" onChange={(e) => setStart(new Date(e.target.value))} value={item.start.toISOString()}/>
      </div>
      <div className="mb-5 flex flex-row items-center">
        <AppLabel className="w-20">Ended</AppLabel>
        <AppTextInput className="w-60 text-center" onChange={(e) => setEnd(new Date(e.target.value))} value={item.end?.toISOString()}/>
      </div>
      <div className="mb-5 flex flex-row items-center">
        <AppLabel className="w-20">Calories</AppLabel>
        <AppTextInput className="w-20 text-center" onChange={(e) => setCaloriesFromString(e.target.value)} value={item.calories} />
      </div>
      <Conditional condition={exercises.length > 0}>
        <div>
          <AppLabel>Exercises:</AppLabel>
        </div>
      </Conditional>
      <div className="mt-3">
        {exercises.map((row, i) => (
          <UpdateWorkoutExerciseForm key={i} item={row} onDelete={deleteExercise} />
          ))}
        <div className="flex justify-center">
          <AppButton onClick={showAddExercisePopup}>Add Exercise</AppButton>
        </div>
      </div>
    </>
  );
};

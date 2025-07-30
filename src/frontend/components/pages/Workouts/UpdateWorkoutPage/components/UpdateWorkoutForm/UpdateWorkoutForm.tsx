import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {FC, useState, useContext} from 'react';
import {UpdateWorkoutExerciseForm} from '../UpdateWorkoutExerciseForm/UpdateWorkoutExerciseForm';
import {UpdateWorkoutExerciseFormExercrise} from '../UpdateWorkoutExerciseForm/types/UpdateWorkoutExerciseFormExercrise';
import {AppTextInput} from '../../../../../atoms/AppTextInput/AppTextInput';
import {AppButton} from '../../../../../atoms/AppButton/AppButton';
import {PopupContext} from '../../../../../atoms/Popup/PopupContext';
import {ExerciseSelectionPopup} from '../../../../../atoms/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {AppBlock} from '../../../../../atoms/AppBlock/AppBlock';
import {AppBlockHeader} from '../../../../../atoms/AppBlock/components/AppBlockHeader';
import {Conditional} from '../../../../../layout/Header/Header';
import {AppLink} from '../../../../../atoms/AppLink/AppLink';
import {AppLabel} from '../../../../../atoms/AppLabel/AppLabel';
import {Workout, WorkoutUpdateDto, Exercise} from '../../../../../../utils/openapi-client';
import {patchWorkoutsByIdMutation, deleteWorkoutsByIdMutation} from '../../../../../../utils/openapi-client/@tanstack/react-query.gen';

export const UpdateWorkoutForm: FC<{item: Workout}> = (props) => {
  const client = useQueryClient();
  const navigation = useNavigate();
  const updateMutation = useMutation({
    ...patchWorkoutsByIdMutation(),
  });
  const deleteMutation = useMutation({
    ...deleteWorkoutsByIdMutation(),
  });
  const popupContext = useContext(PopupContext);
  const updateDTO: WorkoutUpdateDto = props.item;
  const [item, setItem] = useState(updateDTO);
  const [exercises, setExercises] = useState<UpdateWorkoutExerciseFormExercrise[]>(() => {
    return props.item.exercises.map((x) => ({
      exercise: x.exercise,
      workoutExercise: {
        ...x,
      },
    }));
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
  const save = async () => {
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
    const result = await updateMutation.mutateAsync({
      path: {
        id: props.item.id,
      },
      body: newItem,
    });
    if (!result.success) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong');
      return;
    }

    await client.invalidateQueries({queryKey: ['exercises']});
    navigation({
      to: '/workouts',
    });
  };

  const deleteItem = async () => {
    const result = await deleteMutation.mutateAsync({
      path: {
        id: props.item.id,
      },
    });
    if (!result.success) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong');
      return;
    }
    navigation({
      to: '/workouts',
    });
  };
  const setCaloriesFromString = (calories: string) => {
    const value = !isNaN(Number(calories)) ? Number(calories) : 0;
    props.item.calories = value;
    setItem({...props.item});
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

  return (
    <AppBlock className="max-w-2xl">
      <AppBlockHeader>{`Update Workout ${props.item.id.toString()}`}</AppBlockHeader>
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
      <div style={{marginTop: 10}}>
        {exercises.map((row, i) => (
          <UpdateWorkoutExerciseForm key={i} item={row} onDelete={deleteExercise} />
          ))}
        <div className="flex justify-center">
          <AppButton onClick={showAddExercisePopup}>Add Exercise</AppButton>
        </div>
      </div>
      <div className="mt-5 border-b-1 border-neutral-on-surface"/>
      <div className="mt-5 flex flex-row">
        <AppLink to="/workouts">Back</AppLink>
        <div className="grow flex flex-row-reverse gap-2">
          <AppButton onClick={save}>Save</AppButton>
          <AppButton onClick={deleteItem} color={'error'}>Delete</AppButton>
        </div>
      </div>
    </AppBlock>
  );
};

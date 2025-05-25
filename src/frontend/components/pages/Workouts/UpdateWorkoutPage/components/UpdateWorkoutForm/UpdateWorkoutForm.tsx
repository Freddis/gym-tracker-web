import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {FC, useState, CSSProperties, useContext} from 'react';
import {Exercise, Workout, WorkoutUpdateDto, WorkoutUpsertDto} from 'src/frontend/openapi-client';
import {patchWorkoutsByIdMutation, deleteWorkoutsByIdMutation} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {UpdateWorkoutExerciseForm} from '../UpdateWorkoutExerciseForm/UpdateWorkoutExerciseForm';
import {PopupContext} from 'src/frontend/components/atoms/Popup/PopupContext';
import {ExerciseSelectionPopup} from 'src/frontend/components/atoms/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {UpdateWorkoutExerciseFormExercrise} from '../UpdateWorkoutExerciseForm/types/UpdateWorkoutExerciseFormExercrise';
import {AppTextInput} from '../../../../../atoms/AppTextInput/AppTextInput';
import {AppButton} from '../../../../../atoms/AppButton/AppButton';

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
      ...item,
      exercises: exercises.map((x) => x.workoutExercise),
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

  const back = () => {
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
  const deleteExercise = (row: WorkoutUpsertDto['exercises'][0]) => {
    const filtered = exercises.filter((x) => x.workoutExercise !== row);
    setExercises(filtered);
  };
  const showAddExercisePopup = () => {
    popupContext.setContent(<ExerciseSelectionPopup onSelect={addExercise}/>);
  };
  const addExercise = (exercise: Exercise) => {
    const workoutExercise: WorkoutUpsertDto['exercises'][0] = {
      exerciseId: exercise.id,
      sets: [{
        start: new Date(),
        end: new Date(),
        weight: 0,
        reps: 1,
        createdAt: new Date(),
        updatedAt: null,
      }],
      createdAt: new Date(),
      updatedAt: null,
    };
    setExercises([...exercises, {workoutExercise, exercise}]);
    popupContext.setContent(null);
  };

  const labelStyle: CSSProperties = {
    width: 100,
    display: 'inline-block',
  };

  const rowStyle: CSSProperties = {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };
  return (
    <>
      <h2>Update Workout</h2>
      <div style={rowStyle}>
        <label style={labelStyle}>Started</label>
        <AppTextInput onChange={(e) => setStart(new Date(e.target.value))} value={item.start.toISOString()}/>
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Ended</label>
        <AppTextInput onChange={(e) => setEnd(new Date(e.target.value))} value={item.end?.toISOString()}/>
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Calories</label>
        <AppTextInput onChange={(e) => setCaloriesFromString(e.target.value)} value={item.calories} />
      </div>
      <div>
        <h3>Exercises:</h3>
      </div>
      <div style={{marginTop: 10}}>
        {exercises.map((row) => <UpdateWorkoutExerciseForm key={row.workoutExercise.id} item={row} onDelete={deleteExercise} />)}
        <div>
          <AppButton onClick={showAddExercisePopup}>Add Exercise</AppButton>
        </div>
      </div>
      <div style={{marginTop: 20}}>
        <AppButton onClick={back}>Back</AppButton>
        <AppButton onClick={save} style={{marginLeft: 20}}>Save</AppButton>
        <AppButton onClick={deleteItem} color={'error'}>Delete</AppButton>
      </div>
    </>
  );
};

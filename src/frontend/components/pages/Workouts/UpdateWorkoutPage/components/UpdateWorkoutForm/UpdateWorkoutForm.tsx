import {DateTimePicker} from '@mui/x-date-pickers';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import dayjs from 'dayjs';
import {FC, useState, CSSProperties, useContext} from 'react';
import {Exercise, PatchWorkoutsByIdData, Workout, WorkoutExercise, WorkoutExerciseSet} from 'src/frontend/openapi-client';
import {patchWorkoutsByIdMutation, deleteWorkoutsByIdMutation} from 'src/frontend/openapi-client/@tanstack/react-query.gen';
import {WorkoutExerciseWithSets} from 'src/frontend/types/ExerciseWithSets';
import {UpdateWorkoutExerciseForm} from '../UpdateWorkoutExerciseForm/UpdateWorkoutExerciseForm';
import {Button, Input, SxProps} from '@mui/material';
import {PopupContext} from 'src/frontend/components/atoms/Popup/PopupContext';
import {ExerciseSelectionPopup} from 'src/frontend/components/atoms/ExerciseSelectionPopup/ExerciseSelectionPopup';

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
  const [item, setItem] = useState(props.item);

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
    const newItem: Exclude<PatchWorkoutsByIdData['body'], undefined> = {
      ...item,
    };
    const result = await updateMutation.mutateAsync({
      path: {
        id: item.id,
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
        id: item.id,
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
  const deleteExercise = (row: WorkoutExerciseWithSets) => {
    item.exercises = item.exercises.filter((x) => x.id !== row.id);
    setItem({...item});
  };
  const showAddExercisePopup = () => {
    popupContext.setContent(<ExerciseSelectionPopup onSelect={addExercise}/>);
  };
  const addExercise = (exercise: Exercise) => {
    const workoutExercise: WorkoutExercise = {
      id: Math.random(),
      workoutId: item.id,
      userId: item.userId,
      exerciseId: exercise.id,
      createdAt: new Date(),
      updatedAt: null,
    };
    const set: WorkoutExerciseSet = {
      id: Math.random(),
      exerciseId: exercise.id,
      workoutId: item.id,
      start: new Date(),
      end: new Date(),
      weight: 0,
      reps: 1,
      createdAt: new Date(),
      updatedAt: null,
      userId: item.userId,
      workoutExerciseId: workoutExercise.id,
    };
    item.exercises.push({...workoutExercise, sets: [set], exercise: exercise});
    setItem({...item});
    popupContext.setContent(null);
  };

  const labelStyle: CSSProperties = {
    width: 100,
    display: 'inline-block',
  };
  const dateSx: SxProps = {
    '.MuiInputBase-input': {
      color: 'white',
      borderRadius: '5px',
      borderWidth: '1px',
      borderColor: 'none',
      border: 'none',
      backgroundColor: '#222',
      height: 10,
    },
    '.MuiIconButton-sizeMedium': {
      color: 'white',
    },
    'icon': {
      color: 'white',
    },
  };
  const inputSx: SxProps = {
    input: {
      color: 'white',
      background: '#222',
      padding: '16.5px 14px',
      borderRadius: '5px',
      height: 43,
      width: 181,
      boxSizing: 'border-box',
    },
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
        <DateTimePicker sx={dateSx} onChange={(e) => setStart(e?.toDate() ?? new Date())} value={dayjs(item.start)}/>
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Ended</label>
        <DateTimePicker sx={dateSx} onChange={(e) => setEnd(e?.toDate() ?? new Date())} value={dayjs(item.end)}/>
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Calories</label>
        <Input sx={inputSx} onChange={(e) => setCaloriesFromString(e.target.value)} value={item.calories} />
      </div>
      <div>
        <h3>Exercises:</h3>
      </div>
      <div style={{marginTop: 10}}>
        {item.exercises.map((exercise) =>
           <UpdateWorkoutExerciseForm key={exercise.id} item={exercise} onDelete={deleteExercise} />
        )}
        <div>
          <Button onClick={showAddExercisePopup}>Add Exercise</Button>
        </div>
      </div>
      <div style={{marginTop: 20}}>
        <Button onClick={back}>Back</Button>
        {item.userId !== null && <Button onClick={save} style={{marginLeft: 20}}>Save</Button>}
        {item.userId !== null && <Button onClick={deleteItem} color={'error'}>Delete</Button>}
      </div>
    </>
  );
};

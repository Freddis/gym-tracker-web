import {Button, Input, SxProps} from '@mui/material';
import {FC, useContext, useState, CSSProperties, ChangeEvent} from 'react';
import {ExerciseSelectionPopup} from 'src/frontend/components/atoms/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {PopupContext} from 'src/frontend/components/atoms/Popup/PopupContext';
import {Exercise, WorkoutExerciseSet} from 'src/frontend/openapi-client';
import {WorkoutExerciseWithSets} from 'src/frontend/types/ExerciseWithSets';
import {UpdateWorkoutExerciseFormProps} from './types/UpdateWorkoutExerciseFormProps';

export const UpdateWorkoutExerciseForm: FC<UpdateWorkoutExerciseFormProps> = (props) => {
  const popupContext = useContext(PopupContext);
  const [exercise, setExercise] = useState(props.item);
  const [setCounter, setSetCounter] = useState(-1);
  const finalizeExerciseSwap = (selected: Exercise) => {
    const newExercise: WorkoutExerciseWithSets = {
      ...exercise,
      exercise: selected,
    };
    popupContext.setContent(null);
    setExercise(newExercise);
  };
  const popup = <ExerciseSelectionPopup onSelect={finalizeExerciseSwap}/>;
  const imageStyle: CSSProperties = {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit: 'cover',
    marginTop: 10,
  };
  const swapExercise = () => {
    popupContext.setContent(popup);
  };
  const deleteExercise = (exercise: WorkoutExerciseWithSets) => {
    props.onDelete(exercise);
  };
  const addSet = () => {
    const set: WorkoutExerciseSet = {
      id: setCounter,
      exerciseId: props.item.exercise.id,
      workoutId: 0,
      start: new Date(),
      end: new Date(),
      weight: null,
      reps: null,
      createdAt: new Date(),
      updatedAt: null,
      userId: props.item.userId,
      workoutExerciseId: 0,
    };
    props.item.sets.push(set);
    setExercise({...props.item});
    setSetCounter(setCounter - 1);
  };
  const deleteSet = (set: {id: number}) => {
    props.item.sets = props.item.sets.filter((x) => x.id !== set.id); ;
    setExercise({...props.item});
  };
  const updateSetWeight = (set: {id: number}, e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    let strValue = e.target.value;
    if (strValue.endsWith('.')) {
      strValue = strValue.replace('.', '.0');
    }
    const value = !isNaN(Number(strValue)) ? Number(strValue) : 0;

    const targetSet = exercise.sets.find((x) => x.id === set.id);
    if (!targetSet) {
      return;
    }

    targetSet.weight = value;
    setExercise({...exercise});
  };

  const updateSetReps = (set: {id: number}, e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const value = !isNaN(Number(e.target.value)) ? Number(e.target.value) : 0;
    const targetSet = exercise.sets.find((x) => x.id === set.id);
    if (!targetSet) {
      return;
    }
    targetSet.reps = value;
    setExercise({...exercise});
  };
  const inputSx: SxProps = {
    input: {
      color: 'white',
      background: '#222',
      padding: '5px 10px',
      width: '30px',
      borderRadius: '5px',
      textAlign: 'center',
    },
  };
  return (
    <div style={{paddingBottom: 10, display: 'flex', flexDirection: 'row'}}>
    <img style={imageStyle} src={exercise.exercise.images[0]}/>
    <div style={{paddingLeft: 20}}>
      <div>
        <b>{exercise.exercise.name}</b>
        <Button onClick={swapExercise}>Swap Exercise</Button>
        <Button onClick={() => deleteExercise(exercise)} color={'error'}>Delete</Button>
      </div>
      <div style={{marginTop: 10}}>
        {exercise.sets.map((set, i) => (
          <div key={i} style={{marginBottom: 5}}>
            <span style={{marginRight: 5}}>{i + 1}:</span>
            <Input sx={inputSx} onChange={(e) => updateSetWeight(set, e)} value={(set.weight ?? 0).toString()} />
            <span style={{margin: '0px 5px'}}> x </span>
            <Input sx={inputSx} onChange={(e) => updateSetReps(set, e)} value={(set.reps ?? 0).toString()} />
            <Button onClick={() => deleteSet(set)} color={'error'}>Delete</Button>
          </div>
        ))}
        <Button onClick={addSet}>Add Set</Button>
      </div>
    </div>
  </div>
  );
};

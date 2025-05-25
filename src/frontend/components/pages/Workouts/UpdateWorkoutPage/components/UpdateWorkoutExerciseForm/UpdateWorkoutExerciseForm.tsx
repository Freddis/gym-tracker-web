import {FC, useContext, useState, CSSProperties, ChangeEvent} from 'react';
import {ExerciseSelectionPopup} from 'src/frontend/components/atoms/ExerciseSelectionPopup/ExerciseSelectionPopup';
import {PopupContext} from 'src/frontend/components/atoms/Popup/PopupContext';
import {Exercise, WorkoutExerciseSet, WorkoutExerciseSetUpdateDto, WorkoutUpsertDto} from 'src/frontend/openapi-client';
import {UpdateWorkoutExerciseFormProps} from './types/UpdateWorkoutExerciseFormProps';
import {AppButton} from '../../../../../atoms/AppButton/AppButton';
import {AppTextInput} from '../../../../../atoms/AppTextInput/AppTextInput';

export const UpdateWorkoutExerciseForm: FC<UpdateWorkoutExerciseFormProps> = (props) => {
  const popupContext = useContext(PopupContext);
  const [workoutExercise, setWorkoutExercise] = useState(props.item.workoutExercise);
  const [exercise, setExercise] = useState(props.item.exercise);
  const finalizeExerciseSwap = (selected: Exercise) => {
    popupContext.setContent(null);
    props.item.workoutExercise.exerciseId = selected.id;
    setWorkoutExercise({...props.item.workoutExercise});
    setExercise({...selected});
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
  const deleteExercise = (exercise: WorkoutUpsertDto['exercises'][0]) => {
    props.onDelete(exercise);
  };
  const addSet = () => {
    const set: WorkoutExerciseSet = {
      start: new Date(),
      end: new Date(),
      weight: null,
      reps: null,
      id: 0,
      exerciseId: 0,
      workoutId: 0,
      userId: 0,
      workoutExerciseId: 0,
      createdAt: new Date(),
      updatedAt: null,
    };
    props.item.workoutExercise.sets.push(set);
    setWorkoutExercise({...props.item.workoutExercise});
  };
  const deleteSet = (set: WorkoutExerciseSetUpdateDto) => {
    props.item.workoutExercise.sets = props.item.workoutExercise.sets.filter((x) => x !== set); ;
    setWorkoutExercise({...props.item.workoutExercise});
  };
  const updateSetWeight = (set: WorkoutExerciseSetUpdateDto, e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    let strValue = e.target.value;
    if (strValue.endsWith('.')) {
      strValue = strValue.replace('.', '.0');
    }
    const value = !isNaN(Number(strValue)) ? Number(strValue) : 0;

    const targetSet = workoutExercise.sets.find((x) => x === set);
    if (!targetSet) {
      return;
    }

    targetSet.weight = value;
    setWorkoutExercise({...workoutExercise});
  };

  const updateSetReps = (set: WorkoutExerciseSetUpdateDto, e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const value = !isNaN(Number(e.target.value)) ? Number(e.target.value) : 0;
    const targetSet = workoutExercise.sets.find((x) => x === set);
    if (!targetSet) {
      return;
    }
    targetSet.reps = value;
    setWorkoutExercise({...workoutExercise});
  };

  return (
    <div style={{paddingBottom: 10, display: 'flex', flexDirection: 'row'}}>
    <img style={imageStyle} key={exercise.images[0]} src={exercise.images[0]}/>
    <div style={{paddingLeft: 20}}>
      <div>
        <b>{exercise.name}</b>
        <AppButton onClick={swapExercise}>Swap Exercise</AppButton>
        <AppButton onClick={() => deleteExercise(props.item.workoutExercise)} color={'error'}>Delete</AppButton>
      </div>
      <div style={{marginTop: 10}}>
        {workoutExercise.sets.map((set, i) => (
          <div key={i} style={{marginBottom: 5}}>
            <span style={{marginRight: 5}}>{i + 1}:</span>
            <AppTextInput onChange={(e) => updateSetWeight(set, e)} value={(set.weight ?? 0).toString()} />
            <span style={{margin: '0px 5px'}}> x </span>
            <AppTextInput onChange={(e) => updateSetReps(set, e)} value={(set.reps ?? 0).toString()} />
            <AppButton onClick={() => deleteSet(set)} color={'error'}>Delete</AppButton>
          </div>
        ))}
        <AppButton onClick={addSet}>Add Set</AppButton>
      </div>
    </div>
  </div>
  );
};

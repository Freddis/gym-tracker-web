import {Link} from '@tanstack/react-router';
import {FC, CSSProperties} from 'react';
import {Workout, Exercise, ExerciseSet} from 'src/frontend/openapi-client';

export const WorkoutBlock: FC<{item: Workout}> = (props) => {
  const item = props.item;
  const date = new Date(item.createdAt);
  type ExerciseWithSets = Exercise & {sets: Omit<ExerciseSet, 'exercise'>[]}
  const map = new Map<number, ExerciseWithSets>();
  for (const set of item.sets) {
    const exercise: ExerciseWithSets = map.get(set.exercise.id) ?? {...set.exercise, sets: []};
    exercise.sets.push(set);
    map.set(exercise.id, exercise);
  }
  const exercises = Array.from(map.values());
  const imageStyle: CSSProperties = {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit: 'cover',
  };
  const duration = (new Date(props.item.end).getTime() - new Date(props.item.start).getTime()) / 1000;
  const hours = Math.floor(duration / (60 * 60));
  const hoursStr = hours.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);
  const minutesStr = minutes.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const secondsStr = Math.floor(duration - hours * 60 * 60 - minutes * 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
  const time = `${hoursStr}:${minutesStr}:${secondsStr}`;
  const aStyle: CSSProperties = {
    display: 'inline-block',
    textDecoration: 'none',
    color: 'white',
  };
  return (
    <div style={{borderRadius: 10, padding: 20, marginTop: 20, marginBottom: 40, background: '#222'}}>
      <div style={{display: 'block'}}>
        <div>
          <Link to="/workouts/update/$workoutId" params={{workoutId: item.id.toString()}} style={aStyle}>
            <b>Workout: {item.id}</b>
          </Link>
          <div style={{float: 'right'}}>{date.toDateString()}, {date.toLocaleTimeString()}</div>
        </div>
        <div style={{marginTop: 10}}>Duration: {time}</div>
        <div>Calories: {item.calories}</div>
        <div style={{marginTop: 10}}>
          {exercises.map((exercise, i) => (
            <div key={i} style={{paddingBottom: 10, display: 'flex', flexDirection: 'row'}}>
            <img style={imageStyle} src={exercise.images[0]}/>
            <div style={{paddingLeft: 20}}>
              <b>{exercise.name}</b>
              <div style={{marginTop: 10}}>
                {exercise.sets.map((set, i) => (
                  <div key={i}>{i + 1}:{set.weight} x {set.reps}</div>
                ))}
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

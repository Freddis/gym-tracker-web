import {CSSProperties} from 'react';
import {ArgusWorkoutCheckin} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusWorkoutCheckin';
import {ArgusCheckinContainer} from '../ArgusCheckinContainer/ArgusCheckinContainer';

export function ArgusWorkoutCheckinBlock(props: {item: ArgusWorkoutCheckin}) {
  const validExercises = props.item.data.exercises ?? [];//.filter((exercise) =>
  const duration = (props.item.data.end - props.item.data.start) / 1000;
  const hours = Math.floor(duration / (60 * 60));
  const hoursStr = hours.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);
  const minutesStr = minutes.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const secondsStr = Math.floor(duration - hours * 60 * 60 - minutes * 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
  const time = `${hoursStr}:${minutesStr}:${secondsStr}`;
  const imagesBaseUrl = 'http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/';
  const imageStyle: CSSProperties = {
    width: 100,
    height: 100,
    border: '2px solid black',
    borderRadius: 10,
    objectFit: 'cover',
  };
  return <ArgusCheckinContainer item={props.item}>
          <h4>Calories: {(props.item.data.calories ?? 0).toFixed(0)}</h4>
          <h4>Duration: {time}</h4>
          {validExercises.length > 0 && (
            <>
              <h4>Sets:</h4>
              <div style={{paddingLeft: 20, marginBottom: 20}}>
                {validExercises.map((exercise, i) => (
                  <div key={i} style={{paddingBottom: 10, display: 'flex', flexDirection: 'row'}}>
                    <img style={imageStyle} src={`${imagesBaseUrl}${exercise.exercise_name.replaceAll(' ', '+')}-a.jpg`}/>
                    <div style={{paddingLeft: 20}}>
                      <b>{exercise.exercise_name}</b>
                      <div style={{marginTop: 10}}>
                        {exercise.sets.map((set, i) => (
                          <div key={i}>{i + 1}:{set.weight} x {set.reps}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </ArgusCheckinContainer>;
}

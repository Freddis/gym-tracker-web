import {WorkoutEntry} from 'src/server/model/Entry/validators/WorkoutEntry';
import {OpenApiResponse} from 'src/types/OpenApiResponse';

export function Workout(props: {item: OpenApiResponse<WorkoutEntry>}) {

  return <div style={{marginTop: 10}} key={props.item.id}>
          <h3>{props.item.subtype}</h3>
          <h4>Sets:</h4>
          <div style={{paddingLeft: 20, marginBottom: 20}}>
            {props.item.data.exercises.map((exercise, i) => (
              <div key={i} style={{paddingBottom: 10}}>
                <div>{exercise.exercise_name}</div>
                  {exercise.sets.map((set, i) => (
                    <div>{i + 1}:{set.weight} x {set.reps}</div>
                  ))}
              </div>
            ))}
          </div>
          <div>{props.item.createdAt}</div>
        </div>;
}

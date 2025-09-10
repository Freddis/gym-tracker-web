import {ArgusWorkoutCheckin} from 'src/backend/services/DrizzleService/types/ArgusCheckinRow/validators/ArgusWorkoutCheckin';
import {ArgusCheckinContainer} from '../ArgusCheckinContainer/ArgusCheckinContainer';
import {useAppPartialTranslation} from '../../../../../../utils/i18n/useAppPartialTranslation';

export function ArgusWorkoutCheckinBlock(props: {item: ArgusWorkoutCheckin}) {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.argusCheckins);
  const validExercises = props.item.data.exercises ?? [];
  const duration = (props.item.data.end - props.item.data.start) / 1000;
  const hours = Math.floor(duration / (60 * 60));
  const hoursStr = hours.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);
  const minutesStr = minutes.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const secondsStr = Math.floor(duration - hours * 60 * 60 - minutes * 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
  const time = `${hoursStr}:${minutesStr}:${secondsStr}`;
  const imagesBaseUrl = 'http://images.skyhealth.com/fb_app_images/fitness_img_v5.0/';
  return <ArgusCheckinContainer item={props.item}>
          <h4>{t(i18n.labels.calories)}: {(props.item.data.calories ?? 0).toFixed(0)}</h4>
          <h4>{t(i18n.labels.duration)}: {time}</h4>
          {validExercises.length > 0 && (
            <>
              <h4>{t(i18n.labels.sets)}</h4>
              <div className="pl-10 mb-10">
                {validExercises.map((exercise, i) => (
                  <div key={i} className="mb-5 flex">
                    <img className="w-20 h-20 rounded-sm" src={`${imagesBaseUrl}${exercise.exercise_name.replaceAll(' ', '+')}-a.jpg`}/>
                    <div className="ml-5">
                      <b>{exercise.exercise_name}</b>
                      <div className="mt-5">
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

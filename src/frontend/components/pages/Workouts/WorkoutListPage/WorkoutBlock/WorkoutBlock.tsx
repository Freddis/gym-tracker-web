import {FC} from 'react';
import {AppLink} from '../../../../atoms/AppLink/AppLink';
import {AppBlock} from '../../../../atoms/AppBlock/AppBlock';
import {Workout} from '../../../../../utils/openapi-client';
import {useAppPartialTranslation} from '../../../../../utils/i18n/useAppPartialTranslation';
import {AppImage} from '../../../../atoms/AppImage/AppImage';

export const WorkoutBlock: FC<{item: Workout}> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.list.objects.workout);
  const item = props.item;
  const date = new Date(item.createdAt);
  const duration = props.item.end ? (new Date(props.item.end).getTime() - new Date(props.item.start).getTime()) / 1000 : 0;
  const hours = Math.floor(duration / (60 * 60));
  const hoursStr = hours.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);
  const minutesStr = minutes.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const secondsStr = Math.floor(duration - hours * 60 * 60 - minutes * 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
  const time = `${hoursStr}:${minutesStr}:${secondsStr}`;

  const weekDayString = translations.utils.time.weekDays[date.getDay()];
  return (
    <AppBlock>
      <div>
        <AppLink to="/workouts/update/$workoutId" params={{workoutId: item.id.toString()}}>
          <b>{t(i18n.type)}: {item.id}</b>
        </AppLink>
        <div className="float-right">{weekDayString} {date.toLocaleDateString()}, {date.toLocaleTimeString()}</div>
      </div>
      <div className="mt-5">{t(i18n.duration)}: {time}</div>
      <div>{t(i18n.calories)}: {item.calories}</div>
      <div className="mt-5">
        {item.exercises.map((exercise, i) => (
          <div key={i} className="flex flex-row">
          <AppImage src={exercise.exercise.images[0]} className="mt-1" />
          <div className="pl-5">
            <b>{exercise.exercise.name}</b>
            <div className="pb-3">
              {exercise.sets.map((set, i) => (
                <div key={i}>{i + 1}:{set.weight} x {set.reps}</div>
              ))}
            </div>
          </div>
        </div>
        ))}
      </div>
    </AppBlock>
  );
};

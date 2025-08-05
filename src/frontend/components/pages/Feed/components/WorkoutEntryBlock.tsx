import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Entry, Workout} from '../../../../utils/openapi-client';
import {AppBlock} from '../../../atoms/AppBlock/AppBlock';
import {AppImage} from '../../../atoms/AppImage/AppImage';
import {AppAvatar} from '../../../atoms/AppAvatar/AppAvatar';

export const WorkoutEntryBlock: FC<{workout: Workout, entry: Entry}> = ({workout, entry}) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.list.objects.workout);

  const date = new Date(workout.createdAt);
  const duration = workout.end ? (new Date(workout.end).getTime() - new Date(workout.start).getTime()) / 1000 : 0;
  const hours = Math.floor(duration / (60 * 60));
  const hoursStr = hours.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);
  const minutesStr = minutes.toLocaleString(undefined, {minimumIntegerDigits: 2});
  const secondsStr = Math.floor(duration - hours * 60 * 60 - minutes * 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
  const time = `${hoursStr}:${minutesStr}:${secondsStr}`;

  const weekDayString = translations.utils.time.weekDays[date.getDay()];
  return (
    <AppBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">{t(i18n.type)}: {workout.id}</div>
        <div className="grow flex flex-row sm:justify-end">
          {weekDayString} {date.toLocaleDateString()}, {date.toLocaleTimeString()}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="">{t(i18n.duration)}: {time}</div>
        <div>{t(i18n.calories)}: {workout.calories}</div>
      </div>
      <div className="mt-5">
        {workout.exercises.filter((e) => e.sets.length > 0).map((exercise, i) => (
          <div key={i} className="flex flex-row">
          <AppImage src={exercise.exercise.images[0]} className="mt-1 min-w-20" />
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
        <div className="grow flex flex-row-reverse">
          <div className="flex flex-row  items-center">
            <span className="text-accent">{entry.user.name}</span>
            <AppAvatar user={entry.user} className="ml-2"/>
          </div>
        </div>
    </AppBlock>
  );
};

import {FC} from 'react';
import {AppAvatar} from '../../../../../src/frontend/common/components/atoms/AppAvatar/AppAvatar';
import {AppImage} from '../../../../../src/frontend/common/components/atoms/AppImage/AppImage';
import {useAppPartialTranslation} from '../../../../../src/frontend/website/utils/i18n/useAppPartialTranslation';
import {Entry, Workout} from '../../../../../src/frontend/common/utils/openapi-client';
import {MobileBlock} from '../../../../components/MobileScreenContainer/MobileBlock/MobileBlock';
import {AppLink} from '../../../../../src/frontend/common/components/atoms/AppLink/AppLink';

export const MobileWorkoutEntryBlock: FC<{workout: Workout, entry: Entry, own?: boolean}> = ({workout, entry, own}) => {
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
  const exerises = workout.exercises.filter((e) => e.sets.length > 0);
  return (
    <MobileBlock>
      <div className="flex flex-col sm:flex-row">
        <div className="text font-normal">
          {!own && 'Leg Day'}
          {own && (
            <AppLink>Leg Day</AppLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
          {date.toLocaleDateString()}
        </div>
      </div>
      <div className="flex row ">
        <div className="flex flex-col grow">
          <div className="grow">{t(i18n.duration)}: {time}</div>
          <div className="grow">{t(i18n.calories)}: {workout.calories}</div>
        </div>
        <div className="flex flex-col text-right">
          {/* <div>{date.toLocaleDateString()}</div> */}
          <div>{weekDayString}, {date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</div>
          {/* <div className="grow">{t(i18n.duration)}: {time}</div> */}
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        {exerises.map((exercise, i) => (
          <>
          <div key={i} className="flex flex-col">
            <b>{exercise.exercise.name}</b>
            <div className="flex flex-row mt-1">
              <AppImage src={exercise.exercise.images[0]} className="mt-1 w-20 h-20" />
              <div className="pl-5 grow flex flex-row-reverse">
                <div className="">
                  {exercise.sets.map((set, i) => (
                    <div key={i}>{i + 1}: {set.weight} kg x {set.reps}</div>
                  ))}
                </div>
              </div>
            </div>
        </div>
        {i < exerises.length - 1 && <div key={`${i}sep`} className="border-b-1 border-on-surface/15 my-2" />}
        </>
        ))}
      </div>
      {!own && (
      <div className="grow flex flex-row-reverse">
        <div className="flex flex-row  items-center">
          <span className="text-accent">{entry.user.name}</span>
          <AppAvatar user={entry.user} className="ml-2"/>
        </div>
      </div>
      )}
    </MobileBlock>
  );
};

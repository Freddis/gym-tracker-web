import {FC} from 'react';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {Entry, Workout} from '../../../../../common/utils/openapi-client';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {AppImage} from '../../../../../common/components/atoms/AppImage/AppImage';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../common/utils/route';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockDate} from './EntryBlockDate';
import {durationToTimeString} from '../../../../utils/durationToTimeString';

export const WorkoutEntryBlock: FC<{workout: Workout, entry: Entry, own?: boolean}> = ({workout, entry, own}) => {
  const {t, i18n} = useAppPartialTranslation((x) => x.pages.activities.list.objects.workout);
  const duration = workout.end ? (new Date(workout.end).getTime() - new Date(workout.start).getTime()) / 1000 : 0;
  const time = durationToTimeString(duration);
  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          {!own && `${t(i18n.type)}: ${workout.id}`}
          {own && (
            <RouteLink to={route(RouteId.WorkoutUpdate)} params={{id: workout.id.toString()}}>{t(i18n.type)}: {workout.id}</RouteLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
        <EntryBlockDate date={entry.time} />
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
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};

import {FC} from 'react';
import {AppWorkoutMap} from '../../../../../common/components/atoms/AppWorkoutMap/AppWorkoutMap';
import {durationToTimeString} from '../../../../utils/durationToTimeString';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {paceToString} from '../../../../utils/paceToString';
import {speedToPace} from '../../../../utils/speedToPace';
import {usePathDataProcessing} from '../../../../utils/usePathDataProcessing';
import {PostContent} from './PostContent';
import {FeedEntry, OutdoorRun, OutdoorWalk, ReducedOutdoorRun, ReducedOutdoorWalk} from '../../../../../common/utils/openapi-client';
import {useInView} from 'react-intersection-observer';
import {useDebouncedFetchAfterDelay} from '../../../../utils/useDebouncedFetchAfterDelay';
import {avoidLet} from '../../../../../common/utils/avoidLet';

type ReducedRoutedWorkout = ReducedOutdoorRun | ReducedOutdoorWalk;
type RoutedWorkout = OutdoorRun | OutdoorWalk;
interface RoutedWorkoutContentProps {
  entry: FeedEntry;
  workout: ReducedRoutedWorkout | RoutedWorkout;
  fetchWorkout: () => Promise<RoutedWorkout | null>;
}
export const RoutedWorkoutContent: FC<RoutedWorkoutContentProps> = (props) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.list.objects.outdoorRun);
  const {ref, inView} = useInView({
    rootMargin: '50%',
  });
  const propsWorkout: RoutedWorkout | null = avoidLet(() => {
    if ('geoData' in props.workout) {
      const wk: RoutedWorkout = {
        ...props.workout,
      };
      return wk;
    }
    return null;
  });
  const shouldLoad = !propsWorkout && inView;
  const loadedRun = useDebouncedFetchAfterDelay(shouldLoad, 1500, props.fetchWorkout);
  const workout: RoutedWorkout | null = propsWorkout ?? loadedRun;
  const path = usePathDataProcessing(workout?.geoData ?? [], workout?.start ?? new Date(), [workout]);
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col grow">
          <div className="">{t(i18n.duration)}: {durationToTimeString(props.workout.duration)}</div>
          <div>{t(i18n.calories)}: {props.workout.calories.toFixed(0)}</div>
          <div>{t(i18n.distance)}: {(props.workout.distance / 1000).toFixed(3)} {translations.utils.objects.units.km}</div>
        </div>
        <div className=" flex flex-col justify-start items-end">
          <div>{t(i18n.pace)} / {t(i18n.maxPace)}: {paceToString(props.workout.pace)} / {paceToString(speedToPace(path.maxSpeed))}</div>
          <div>{t(i18n.elevationGain)}: {path.elevationGain.toFixed(0)} {translations.utils.objects.units.m}</div>
          {!!props.workout.cadence && !!props.workout.maxCadence && (
            <div>{t(i18n.cadence)} / {t(i18n.maxCadence)}: {props.workout.cadence.toFixed(0)} / {props.workout.maxCadence.toFixed(0)}</div>
            )}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-5 justify-center">
        <PostContent entry={props.entry} />
        {workout?.geoData && workout?.geoData.length > 1 && (
          <div className="w-full h-100 rounded-lg overflow-hidden">
            <AppWorkoutMap data={path} />
          </div>
        )}
        {!workout && (
          <div className="w-full h-100 rounded-lg overflow-hidden bg-blue-950/50" />
        )}
        <div ref={ref} />
      </div>
    </>
  );
};

import {FC, useMemo} from 'react';
import {AppBlock} from '../../../../../common/components/atoms/AppBlock/AppBlock';
import {RouteLink} from '../../../../../common/components/atoms/RouteLink/RouteLink';
import {route, RouteId} from '../../../../../common/utils/route';
import {useAppPartialTranslation} from '../../../../utils/i18n/useAppPartialTranslation';
import {EntryBlockBottom} from './EntryBlockBottom';
import {EntryBlockDate} from './EntryBlockDate';
import {Entry, OutdoorRun, PathPoint} from '../../../../../common/utils/openapi-client';
import {Map, Polyline} from '@vis.gl/react-google-maps';
import {PostContent} from './PostContent';
import {durationToTimeString} from '../../../../utils/durationToTimeString';
import {getHeatColor} from '../../../../utils/getHeatColor';
import {paceToString} from '../../../../utils/paceToString';
import {PercentileCounter} from '../../../../utils/PercentileCounter';
import {speedToPace} from '../../../../utils/speedToPace';

export const OutdoorRunEntryBlock: FC<{entry: Entry, outdoorRun: OutdoorRun, own?: boolean}> = ({entry, own, outdoorRun}) => {
  const {t, i18n, translations} = useAppPartialTranslation((x) => x.pages.activities.list.objects.outdoorRun);
  const {time, lines, center, elevationGain, maxPace} = useMemo(() => {
    const speedCounter = new PercentileCounter((speed) => speed.toFixed(1), true);
    const time = durationToTimeString(outdoorRun.duration);
    const chunks: PathPoint[][] = [];
    let currentChunk: PathPoint[] = [];
    const chunkSize = 1000 * 60 * 1;
    let nextChunkLimit = new Date(outdoorRun.start.getTime() + chunkSize);
    // let minSpeed = 1000;
    // let maxSpeed = 0;
    let minLng = 1000;
    let maxLng = -1000;
    let minLat = 1000;
    let maxLat = -1000;
    let elevationGain = 0;
    let minElevation = 1000;
    let maxElevation = -1000;
    const elevationThreshold = 0.1;
    const windowSize = 4;
    const elevationWindow: number[] = [];
    let elevationSum = 0;

    let prevSmoothed: number | null = null;
    for (const point of outdoorRun.geoData ?? []) {
       // --- smoothing ---
      elevationWindow.push(point.altitude);
      elevationSum += point.altitude;
      if (elevationWindow.length > windowSize) {
        elevationSum -= elevationWindow.shift()!;
      }
      const smoothedElevation = elevationSum / elevationWindow.length;
      if (prevSmoothed !== null) {
        const diff = smoothedElevation - prevSmoothed;
        if (diff > elevationThreshold) {
          elevationGain += diff;
        }
      }
      prevSmoothed = smoothedElevation;
      // if (prevPoint) {
      //   const diff = point.altitude - prevPoint.altitude;
      //   if (diff > elevationThreshold) {
      //     elevationGain += diff;
      //   }
      // }
      // prevPoint = point;
      if (point.speed !== null) {
        speedCounter.add(point.speed);
      }
      // minSpeed = Math.min(minSpeed, point.speed ?? 0);
      // maxSpeed = Math.max(maxSpeed, point.speed ?? 0);
      minLng = Math.min(minLng, point.longitude);
      maxLng = Math.max(maxLng, point.longitude);
      minLat = Math.min(minLat, point.latitude);
      maxLat = Math.max(maxLat, point.latitude);
      minElevation = Math.min(minElevation, point.altitude);
      maxElevation = Math.max(maxElevation, point.altitude);

      if (nextChunkLimit.getTime() - (outdoorRun.start.getTime() + point.timestamp) > 0) {
        currentChunk.push(point);
      } else {
        currentChunk.push(point);
        chunks.push(currentChunk);
        currentChunk = [];
        currentChunk.push(point);
        nextChunkLimit = new Date(outdoorRun.start.getTime() + point.timestamp + chunkSize);
      }
    }
    chunks.push(currentChunk);
    const maxSpeed = speedCounter.get95Percentile();
    const minSpeed = speedCounter.getPercentile(0.05, 'max');
    const lines = chunks.map((chunk, i) => {
      const speed = chunk.reduce((acc, curr) => acc + (curr.speed ?? 0), 0) / chunk.length;
      const color = getHeatColor(speed, minSpeed, maxSpeed);
      // const elevationGain = chunk.reduce((acc, curr) => acc + (curr.altitude), 0) / chunk.length;
      // const color = getHeatColor(elevationGain, minElevation, maxElevation);
      return (
      <Polyline
        key={i}
        path={chunk.map((x) => ({lat: x.latitude, lng: x.longitude}))}
        strokeColor={color}
        strokeWeight={3}
      />
      );
    });
    const center: {lat: number, lng: number} = {lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2};
    return {time, lines, center, elevationGain, maxPace: speedToPace(maxSpeed)};
  }, [outdoorRun]);

  return (
    <AppBlock data-testid={`entry-${entry.id}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="text-lg font-normal mb-5">
          {!own && `${t(i18n.type)}: ${outdoorRun.id}`}
          {own && (
            <RouteLink to={route(RouteId.WorkoutUpdate)} params={{id: entry.id.toString()}}>{t(i18n.type)}: {entry.id}</RouteLink>
          )}
        </div>
        <div className="grow flex flex-row sm:justify-end">
          <EntryBlockDate date={entry.time} />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col grow">
          <div className="">{t(i18n.duration)}: {time}</div>
          <div>{t(i18n.calories)}: {outdoorRun.calories.toFixed(0)}</div>
          <div>{t(i18n.distance)}: {(outdoorRun.distance / 1000).toFixed(3)} {translations.utils.objects.units.km}</div>
        </div>
        <div className=" flex flex-col justify-start items-end">
          <div>{t(i18n.pace)} / {t(i18n.maxPace)}: {paceToString(outdoorRun.pace)} / {paceToString(maxPace)}</div>
          <div>{t(i18n.elevationGain)}: {elevationGain.toFixed(0)} {translations.utils.objects.units.m}</div>
          {!!outdoorRun.cadence && !!outdoorRun.maxCadence && (
            <div>{t(i18n.cadence)} / {t(i18n.maxCadence)}: {outdoorRun.cadence.toFixed(0)} / {outdoorRun.maxCadence.toFixed(0)}</div>
            )}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-5 justify-center">
        <PostContent entry={entry} />
        {outdoorRun.geoData && outdoorRun.geoData.length > 0 && (
          <div className="w-full h-100 rounded-lg overflow-hidden">
            <Map
              style={{width: '100%', height: '100%'}}
              defaultCenter={center}
              defaultZoom={14}
              gestureHandling="greedy"
              disableDefaultUI
            >
            {lines}
            </Map>
          </div>
        )}
      </div>
      <EntryBlockBottom entry={entry} own={own} />
    </AppBlock>
  );
};

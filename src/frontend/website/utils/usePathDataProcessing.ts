import {useMemo} from 'react';
import {PathPoint} from '../../common/utils/openapi-client';
import {PercentileCounter} from './PercentileCounter';

export interface ProcessedPathData {
  chunks: PathPoint[][];
  center: {lat: number, lng: number};
  elevationGain: number;
  minSpeed: number;
  maxSpeed: number;
  bounds: {east: number, west: number, north: number, south: number, padding: number};
}

export const usePathDataProcessing = (geoData: PathPoint[], start: Date, deps: unknown[]): ProcessedPathData => {
  const result = useMemo(() => {
    const speedCounter = new PercentileCounter((speed) => speed.toFixed(1), true);
    const chunks: PathPoint[][] = [];
    let currentChunk: PathPoint[] = [];
    const chunkSize = 1000 * 60 * 1;
    let nextChunkLimit = new Date(start.getTime() + chunkSize);
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
    for (const point of geoData ?? []) {
      const [latitude, longitude, altitude, timestamp, speed] = point;

       // --- smoothing ---
      elevationWindow.push(altitude);
      elevationSum += altitude;
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
      if (speed !== null) {
        speedCounter.add(speed);
      }
      // minSpeed = Math.min(minSpeed, point.speed ?? 0);
      // maxSpeed = Math.max(maxSpeed, point.speed ?? 0);
      minLng = Math.min(minLng, longitude);
      maxLng = Math.max(maxLng, longitude);
      minLat = Math.min(minLat, latitude);
      maxLat = Math.max(maxLat, latitude);
      minElevation = Math.min(minElevation, altitude);
      maxElevation = Math.max(maxElevation, altitude);

      if (nextChunkLimit.getTime() - (start.getTime() + timestamp) > 0) {
        currentChunk.push(point);
      } else {
        currentChunk.push(point);
        chunks.push(currentChunk);
        currentChunk = [];
        currentChunk.push(point);
        nextChunkLimit = new Date(start.getTime() + timestamp + chunkSize);
      }
    }
    chunks.push(currentChunk);
    const maxSpeed = speedCounter.get95Percentile();
    const minSpeed = speedCounter.getPercentile(0.05, 'max');
    // const lines = chunks.map((chunk, i) => {
    //   const speed = chunk.reduce((acc, curr) => acc + (curr.speed ?? 0), 0) / chunk.length;
    //   const color = getHeatColor(speed, minSpeed, maxSpeed);
    //   // const elevationGain = chunk.reduce((acc, curr) => acc + (curr.altitude), 0) / chunk.length;
    //   // const color = getHeatColor(elevationGain, minElevation, maxElevation);
    //   return (
    //   <Polyline
    //     key={i}
    //     path={chunk.map((x) => ({lat: x.latitude, lng: x.longitude}))}
    //     strokeColor={color}
    //     strokeWeight={3}
    //   />
    //   );
    // });
    const center: {lat: number, lng: number} = {lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2};
    const bounds = {
      east: maxLng,
      west: minLng,
      north: maxLat,
      south: minLat,
      padding: 1,
    };
    const result: ProcessedPathData = {chunks, center, elevationGain, minSpeed, maxSpeed, bounds};
    return result;
  }, deps);
  return result;
};

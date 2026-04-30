import {Polyline, Map} from '@vis.gl/react-google-maps';
import {FC, useMemo} from 'react';
import {getHeatColor} from '../../../../website/utils/getHeatColor';
import {ProcessedPathData} from '../../../../website/utils/usePathDataProcessing';

export interface AppWorkoutMapProps {
  data: ProcessedPathData;
}
export const AppWorkoutMap: FC<AppWorkoutMapProps> = (props) => {
  const lines = useMemo(() => props.data.chunks.map((chunk, i) => {
    const {minSpeed, maxSpeed} = props.data;
    const speed = chunk.reduce((acc, curr) => acc + (curr.speed ?? 0), 0) / chunk.length;
    const color = getHeatColor(speed, minSpeed, maxSpeed);
    return (
      <Polyline
        key={i}
        path={chunk.map((x) => ({lat: x.latitude, lng: x.longitude}))}
        strokeColor={color}
        strokeWeight={3}
      />
    );
  }), [props.data]);

  return (
    <Map
        style={{width: '100%', height: '100%'}}
        defaultBounds={props.data.bounds}
        gestureHandling="greedy"
        disableDefaultUI
      >
      {lines}
      </Map>
  );
};

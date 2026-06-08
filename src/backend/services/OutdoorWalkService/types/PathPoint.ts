// export interface PathPoint {
//   altitude: number;
//   course: number | null;
//   timestamp: number;
//   distance: number | null;
//   horizontalAccuracy: number | null;
//   latitude: number;
//   longitude: number;
//   speed: number | null;
//   speedAccuracy: number | null;
//   verticalAccuracy: number | null;
// }

export type PathPoint = [number, number, number, number, number];

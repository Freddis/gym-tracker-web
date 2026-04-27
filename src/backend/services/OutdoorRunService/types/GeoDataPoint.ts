export interface GeoDataPoint {
  altitude: number;
  course: number | null;
  timestamp: Date;
  distance: number | null;
  horizontalAccuracy: number | null;
  heartRate: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
  speedAccuracy: number | null;
  verticalAccuracy: number | null;
}

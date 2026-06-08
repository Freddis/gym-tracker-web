import {number, tuple} from 'zod';

// export const pathPointValidator = object({
//   altitude: number().openapi({description: 'Altitude of the geo data point'}),
//   course: number().nullable().openapi({description: 'Course of the geo data point'}),
//   speed: number().nullable().openapi({description: 'Speed of the geo data point'}),
//   distance: number().nullable().openapi({description: 'Distance of the geo data point'}),
//   latitude: number().openapi({description: 'Latitude of the geo data point'}),
//   longitude: number().openapi({description: 'Longitude of the geo data point'}),
//   horizontalAccuracy: number().nullable().openapi({description: 'Horizontal accuracy of the geo data point'}),
//   verticalAccuracy: number().nullable().openapi({description: 'Vertical accuracy of the geo data point'}),
//   speedAccuracy: number().nullable().openapi({description: 'Speed accuracy of the geo data point'}),
//   timestamp: number().openapi({description: 'Timestamp of the path point'}),
// }).openapi({
//   ref: 'PathPoint',
//   description: 'Path point used to display routes on map for activities such as walking, hiking, etc.',
// });

export const pathPointValidator = tuple([number(), number(), number(), number(), number()]).openapi({
  ref: 'PathPoint',
  description: 'Path point used to display routes on map for activities such as walking, hiking, etc.',
});

import {number, object} from 'zod';

export const heartRatePointValidator = object({
  timestamp: number().openapi({description: 'Timestamp of the heart rate point'}),
  heartRate: number().openapi({description: 'Heart rate of the heart rate point'}),
}).openapi({ref: 'HeartRatePoint', description: 'Heart rate point'});

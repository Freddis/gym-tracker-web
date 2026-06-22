import {object, string, date, number} from 'zod';

export const weightHistoryRowValidator = object({
  id: string().openapi({description: 'Id of the weight entry'}),
  time: date().openapi({description: 'Time of the weight entry'}),
  weight: number().openapi({description: 'Weight value'}),
  units: string().openapi({description: 'Units in which this weight is calculdated'}),
}).openapi({ref: 'WeightHistoryRow', description: 'History of weight records preceding the current weight entry'});

import {z} from 'zod';
import {argusCheckinValidator} from './ArgusCheckin';

export const argusResponseValidator = z.object({
  cursor: z.string().optional().nullable(),
  count: z.number(),
  hasMore: z.boolean(),
  checkins: argusCheckinValidator.array(),
});

export type ArgusResponseValidator = typeof argusResponseValidator
export type ArgusResponse = z.TypeOf<ArgusResponseValidator>

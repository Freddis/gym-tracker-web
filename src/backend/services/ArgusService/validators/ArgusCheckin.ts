import {z} from 'zod';
import {ZodHelper} from '../../../../common/utils/ZodHelper/ZodHelper';

export const argusCheckinValidator = z.object({
  id: z.string(),
  user_id: ZodHelper.validators.numberOrStringNumber,
  timezone: ZodHelper.validators.numberOrStringNumber.optional(),
  type: z.string(),
  subtype: z.string().optional(),
  created: z.number(),
  timestamp: z.number(),
}).passthrough();

export type ArgusCheckinValidator = typeof argusCheckinValidator;
export type ArgusCheckin = z.TypeOf<ArgusCheckinValidator>;

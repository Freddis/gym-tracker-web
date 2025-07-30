import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {ZodHelper} from 'src/common/utils/ZodHelper/ZodHelper';

export const argusCheckinDataValidator = z.object({
  id: ZodHelper.validators.numberOrStringNumber.openapi({type: 'number'}),
  type: z.nativeEnum(ArgusCheckinType),
  created: z.number(),
  user_id: ZodHelper.validators.numberOrStringNumber.openapi({type: 'number'}),
  timestamp: z.number(),
});

export type ArgusCheckinDataValidator = typeof argusCheckinDataValidator
export type ArgusCheckinData = z.TypeOf<ArgusCheckinDataValidator>

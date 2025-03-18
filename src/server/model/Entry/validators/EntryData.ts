import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {ZodHelper} from 'src/utls/ZodHelper/ZodHelper';

export const entryDataValidator = z.object({
  id: ZodHelper.validators.numberOrStringNumber.openapi({type: 'number'}),
  type: z.nativeEnum(EntryType),
  created: z.number(),
  user_id: ZodHelper.validators.numberOrStringNumber.openapi({type: 'number'}),
  timestamp: z.number(),
});

export type EntryDataValidator = typeof entryDataValidator
export type EntryData = z.TypeOf<EntryDataValidator>

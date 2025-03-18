import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/server/drizzle/db';
import {EntrySubtype} from '../types/EntrySubtype';

export const walkingEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Activity}`),
  subtype: z.literal(`${EntrySubtype.Walking}`),
  data: z.unknown(),
});

export type WalkingEntryValidator = typeof walkingEntryValidator;
export type WalkingEntry = z.TypeOf<WalkingEntryValidator>

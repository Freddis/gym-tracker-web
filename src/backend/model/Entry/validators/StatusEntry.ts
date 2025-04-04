import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const statusEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Status}`),
  subtype: z.null(),
  data: z.object({
    note: z.string(),
    photos: z.object({
      id: z.string(),
      href: z.string(),
    }).array().optional(),
  }).passthrough(),
});

export type StatusEntryValidator = typeof statusEntryValidator;
export type StatusEntry = z.TypeOf<StatusEntryValidator>

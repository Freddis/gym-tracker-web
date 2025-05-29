import {z} from 'zod';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';

export const argusStatusCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  type: z.literal(`${ArgusCheckinType.Status}`),
  subtype: z.null(),
  data: z.object({
    note: z.string(),
    photos: z.object({
      id: z.string(),
      href: z.string(),
    }).array().optional(),
  }).passthrough(),
});

export type ArgusStatusCheckinValidator = typeof argusStatusCheckinValidator;
export type ArgusStatusCheckin = z.TypeOf<ArgusStatusCheckinValidator>

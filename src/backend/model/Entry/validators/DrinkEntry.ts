import {z} from 'zod';
import {EntryType} from '../types/EntryType';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {EntrySubtype} from '../types/EntrySubtype';

export const drinkEntryValidator = createSelectSchema(dbSchema.entries).extend({
  type: z.literal(`${EntryType.Drink}`),
  subtype: z.enum([`${EntrySubtype.Coffee}`, `${EntrySubtype.Water}`]),
  data: z.unknown(),
});

export type DrinkEntryValidator = typeof drinkEntryValidator;
export type DrinkEntry = z.TypeOf<DrinkEntryValidator>

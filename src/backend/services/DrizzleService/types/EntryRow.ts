import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {TypeOf} from 'zod';

export const entryRowValidator = createSelectSchema(dbSchema.entries);
export type EntryRowValidator = typeof entryRowValidator;
export type EntryRow = TypeOf<EntryRowValidator>

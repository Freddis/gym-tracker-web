import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from './db';

export const imageRowValidator = createSelectSchema(dbSchema.images);
export type ImageRow = typeof dbSchema.images.$inferSelect;

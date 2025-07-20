import {dbSchema} from '../../drizzle/db';

export type Image = typeof dbSchema.images.$inferSelect;

import {dbSchema} from './db';

export type ImageRow = typeof dbSchema.images.$inferSelect;

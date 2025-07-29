import {dbSchema} from '../../services/DrizzleService/types/db';

export type Image = typeof dbSchema.images.$inferSelect;

import {dbSchema} from 'src/backend/drizzle/db';

export type User = typeof dbSchema.users.$inferSelect

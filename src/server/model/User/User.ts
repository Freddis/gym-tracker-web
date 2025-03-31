import {dbSchema} from 'src/server/drizzle/db';

export type User = typeof dbSchema.users.$inferSelect

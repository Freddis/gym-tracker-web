import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const managerRowValidator = createSelectSchema(dbSchema.managers);
export type ManagerRow = z.TypeOf<typeof managerRowValidator>;

import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const userValidator = createSelectSchema(dbSchema.users);
export type UserValidator = typeof userValidator;
export type UserRow = z.TypeOf<UserValidator>;

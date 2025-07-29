import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const userValidator = createSelectSchema(dbSchema.users).openapi({ref: 'User'});
export type UserValidator = typeof userValidator;
export type User = z.TypeOf<UserValidator>;

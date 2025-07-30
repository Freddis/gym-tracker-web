import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const weightRowValidator = createSelectSchema(dbSchema.weight);
export type WeightRowValidator = typeof weightRowValidator;
export type WeightRow = z.TypeOf<WeightRowValidator>;

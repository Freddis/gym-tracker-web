import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {z} from 'zod';

export const exerciseValidator = createSelectSchema(dbSchema.exercises).openapi({ref: 'Exercise'});
export type ExerciseValidator = typeof exerciseValidator;
export type Exercise = z.TypeOf<ExerciseValidator>

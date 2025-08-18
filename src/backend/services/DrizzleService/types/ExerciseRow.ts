import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {TypeOf} from 'zod';

export const exerciseRowValidator = createSelectSchema(dbSchema.exercises);
export type ExerciseValidator = typeof exerciseRowValidator;
export type ExerciseRow = TypeOf<ExerciseValidator>

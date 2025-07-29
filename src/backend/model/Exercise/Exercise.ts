import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {TypeOf} from 'zod';

export const exerciseValidator = createSelectSchema(dbSchema.exercises).extend({}).openapi({ref: 'Exercise'});
export type ExerciseValidator = typeof exerciseValidator;
export type Exercise = TypeOf<ExerciseValidator>

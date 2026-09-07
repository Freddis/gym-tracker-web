import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from './db';
import {TypeOf} from 'zod';

export const exerciseImageRowValidator = createSelectSchema(dbSchema.exerciseImages);
export type ExerciseImageValidator = typeof exerciseImageRowValidator;
export type ExerciseImageRow = TypeOf<ExerciseImageValidator>

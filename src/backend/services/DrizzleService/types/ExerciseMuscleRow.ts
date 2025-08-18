import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from './db';
import {TypeOf} from 'zod';

export const exerciseMuscleValidator = createSelectSchema(dbSchema.muscles);

export type ExerciseMuscleValidator = typeof exerciseMuscleValidator;
export type ExerciseMuscleRow = TypeOf<ExerciseMuscleValidator>;

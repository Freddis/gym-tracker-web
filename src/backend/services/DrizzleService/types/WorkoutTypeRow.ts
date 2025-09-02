import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const workoutTypeRowValidator = createSelectSchema(dbSchema.workoutTypes);
export type WorkoutTypeRowValidator = typeof workoutTypeRowValidator;
export type WorkoutTypeRow = z.TypeOf<WorkoutTypeRowValidator>;

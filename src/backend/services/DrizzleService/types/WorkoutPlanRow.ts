import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/services/DrizzleService/types/db';
import {z} from 'zod';

export const workoutPlanRowValidator = createSelectSchema(dbSchema.workoutPlans);
export type WorkoutPlanRowValidator = typeof workoutPlanRowValidator;
export type WorkoutPlanRow = z.TypeOf<WorkoutPlanRowValidator>

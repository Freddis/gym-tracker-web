import {z} from 'zod';
import {ArgusCheckinSubtype} from '../types/ArgusCheckinSubtype';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {ArgusCheckinType} from '../types/ArgusCheckinType';
import {argusCheckinDataValidator} from './ArgusCheckinData';
import {ZodHelper} from 'src/common/utils/ZodHelper/ZodHelper';


export const argusWorkoutCheckinValidator = createSelectSchema(dbSchema.argusCheckins).extend({
  subtype: z.literal(`${ArgusCheckinSubtype.Workout}`),
  type: z.literal(`${ArgusCheckinType.Activity}`),
  data: argusCheckinDataValidator.extend({
    subtype: z.literal(`${ArgusCheckinSubtype.Workout}`),
    type: z.literal(`${ArgusCheckinType.Activity}`),
    activeDuration: z.number().optional(),
    duration: z.number().optional(),
    calories: z.number().optional(),
    created: z.number(),
    TotalExercisesInWorkout: z.number().optional(),
    end: z.number(),
    start: z.number(),
    exercises: z.array(
      z.object({
        exercise_id: z.string(),
        exercise_name: z.string(),
        exercise_type: z.string(),
        sets: z.array(z.object({
          draft: z.boolean().optional(),
          reps: ZodHelper.validators.numberOrStringNumber.optional().openapi({type: 'number'}),
          weight: z.unknown().transform((x) => {
            if (typeof x === 'string') {
              x = x.replaceAll(',', '.');
            }
            const res = ZodHelper.validators.numberOrStringNumber.parse(x);
            return res;
          }).optional().openapi({type: 'number'}),
        })),
      })
    ).optional(),
  }),
});

export type ArgusWorkoutCheckinValidator = typeof argusWorkoutCheckinValidator;
export type ArgusWorkoutCheckin = z.TypeOf<ArgusWorkoutCheckinValidator>

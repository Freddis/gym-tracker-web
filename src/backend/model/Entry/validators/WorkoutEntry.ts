import {z} from 'zod';
import {EntrySubtype} from '../types/EntrySubtype';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/backend/drizzle/db';
import {EntryType} from '../types/EntryType';
import {entryDataValidator} from './EntryData';
import {ZodHelper} from 'src/common/utils/ZodHelper/ZodHelper';


export const workoutEntryValidator = createSelectSchema(dbSchema.entries).extend({
  subtype: z.literal(`${EntrySubtype.Workout}`),
  type: z.literal(`${EntryType.Activity}`),
  data: entryDataValidator.extend({
    subtype: z.literal(`${EntrySubtype.Workout}`),
    type: z.literal(`${EntryType.Activity}`),
    activeDuration: z.number().optional(),
    duration: z.number(),
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

export type WorkoutEntryValidator = typeof workoutEntryValidator;
export type WorkoutEntry = z.TypeOf<WorkoutEntryValidator>

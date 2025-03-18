import {z} from 'zod';
import {EntrySubtype} from '../types/EntrySubtype';
import {createSelectSchema} from 'drizzle-zod';
import {dbSchema} from 'src/server/drizzle/db';
import {EntryType} from '../types/EntryType';
import {entryDataValidator} from './EntryData';


export const workoutEntryValidator = createSelectSchema(dbSchema.entries).extend({
  subtype: z.literal(`${EntrySubtype.Workout}`),
  type: z.literal(`${EntryType.Activity}`),
  data: entryDataValidator.extend({
    subtype: z.literal(`${EntrySubtype.Workout}`),
    type: z.literal(`${EntryType.Activity}`),
    activeDuration: z.number(),
    duration: z.number(),
    calories: z.number(),
    created: z.number(),
    TotalExercisesInWorkout: z.number(),
    end: z.number(),
    start: z.number(),
    exercises: z.array(z.object({
      exercise_id: z.string(),
      exercise_name: z.string(),
      exercise_type: z.string(),
      sets: z.array(z.object({
        draft: z.boolean(),
        reps: z.number(),
        weight: z.number(),
      })),
    })
),
  }),
});

export type WorkoutEntryValidator = typeof workoutEntryValidator;
export type WorkoutEntry = z.TypeOf<WorkoutEntryValidator>

import {number, object} from 'zod';

export const workoutTypeExerciseSetValidator = object({
  reps: number().nullable().openapi({description: 'Target number of reps'}),
}).openapi({ref: ' WorkoutTypeExerciseSet'});

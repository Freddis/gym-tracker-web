import {z} from 'zod';
import {workoutExerciseUpdateDtoValidator} from '../WorkoutExercise/WorkoutExerciseUpdateDto';
import {workoutValidator} from './Workout';

export const workoutUpdateDtoValidator = workoutValidator.omit({
  userId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  // id: z.number().optional(),
  exercises: workoutExerciseUpdateDtoValidator.array(),
}).openapi({ref: 'WorkoutUpdateDTO'});

export type WorkoutUpdateDtoValidator = typeof workoutUpdateDtoValidator
export type WorkoutUpdateDto = z.TypeOf<WorkoutUpdateDtoValidator>

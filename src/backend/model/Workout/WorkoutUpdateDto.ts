import {z} from 'zod';
import {workoutExerciseUpdateDtoValidator} from '../WorkoutExercise/WorkoutExerciseUpdateDto';
import {workoutValidator} from './Workout';

export const workoutUpdateDtoValidator = workoutValidator.omit({
  userId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  exercises: workoutExerciseUpdateDtoValidator.array(),
}).openapi({ref: 'WorkoutUpdateDto'});

export type WorkoutUpdateDtoValidator = typeof workoutUpdateDtoValidator
export type WorkoutUpdateDto = z.TypeOf<WorkoutUpdateDtoValidator>

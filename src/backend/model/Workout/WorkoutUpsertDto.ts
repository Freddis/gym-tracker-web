import {z} from 'zod';
import {workoutValidator} from './Workout';
import {workoutExerciseUpsertDtoValidator} from '../WorkoutExercise/WorkoutExerciseUpsertDto';

export const workoutUpsertDtoValidator = workoutValidator.omit({
  userId: true,
}).extend({
  id: workoutValidator.shape.id.optional(),
  exercises: workoutExerciseUpsertDtoValidator.array(),
}).openapi({ref: 'WorkoutUpsertDto'});

export type WorkoutUpsertDtoValidator = typeof workoutUpsertDtoValidator
export type WorkoutUpsertDto = z.TypeOf<WorkoutUpsertDtoValidator>

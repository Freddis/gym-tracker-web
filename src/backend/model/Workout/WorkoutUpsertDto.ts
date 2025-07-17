import {z} from 'zod';
import {workoutValidator} from './Workout';
import {workoutExerciseUpsertDtoValidator} from '../WorkoutExercise/WorkoutExerciseUpsertDto';
import {openApi} from '../../utils/openApi';

export const workoutUpsertDtoValidator = workoutValidator.omit({
  userId: true,
}).extend({
  id: workoutValidator.shape.id.optional(),
  exercises: workoutExerciseUpsertDtoValidator.array(),
  start: openApi.validators.strings.datetime,
  end: openApi.validators.strings.datetime.nullable(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
}).openapi({ref: 'WorkoutUpsertDto'});

export type WorkoutUpsertDtoValidator = typeof workoutUpsertDtoValidator
export type WorkoutUpsertDto = z.TypeOf<WorkoutUpsertDtoValidator>

import {z} from 'zod';
import {workoutExerciseUpdateDtoValidator} from '../WorkoutExercise/WorkoutExerciseUpdateDto';
import {workoutValidator} from './Workout';
import {openApi} from '../../utils/openApi';

export const workoutUpdateDtoValidator = workoutValidator.omit({
  userId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  exercises: workoutExerciseUpdateDtoValidator.array(),
  start: openApi.validators.strings.datetime,
  end: openApi.validators.strings.datetime.nullable(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime.nullable(),
}).openapi({ref: 'WorkoutUpdateDto'});

export type WorkoutUpdateDtoValidator = typeof workoutUpdateDtoValidator
export type WorkoutUpdateDto = z.TypeOf<WorkoutUpdateDtoValidator>

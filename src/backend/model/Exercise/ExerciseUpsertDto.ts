import {z} from 'zod';
import {exerciseValidator} from './Exercise';

export const exerciseUpsertDtoValidator = exerciseValidator.omit({
  userId: true,
  parentExerciseId: true,
}).extend({
  id: exerciseValidator.shape.id.nullable(),
}).openapi({ref: 'ExerciseUpsertDto'});
export type ExerciseUpsertDtoValidator = typeof exerciseUpsertDtoValidator;
export type ExerciseUpsertDto = z.TypeOf<ExerciseUpsertDtoValidator>

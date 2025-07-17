import {z} from 'zod';
import {exerciseValidator} from './Exercise';
import {openApi} from '../../utils/openApi';

export const exerciseUpsertDtoValidator = exerciseValidator.omit({
  userId: true,
  parentExerciseId: true,
}).extend({
  id: exerciseValidator.shape.id.nullable(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime,
}).openapi({ref: 'ExerciseUpsertDto'});
export type ExerciseUpsertDtoValidator = typeof exerciseUpsertDtoValidator;
export type ExerciseUpsertDto = z.TypeOf<ExerciseUpsertDtoValidator>

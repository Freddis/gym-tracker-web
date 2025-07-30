import {exerciseRowValidator} from '../../../../services/DrizzleService/types/ExerciseRow';
import {openApi} from '../../../../utils/openApi';

export const exerciseUpsertDtoValidator = exerciseRowValidator.omit({
  userId: true,
  parentExerciseId: true,
}).extend({
  id: exerciseRowValidator.shape.id.nullable(),
  createdAt: openApi.validators.strings.datetime,
  updatedAt: openApi.validators.strings.datetime,
}).openapi({ref: 'ExerciseUpsertDto'});

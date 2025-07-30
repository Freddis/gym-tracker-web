import {exerciseRowValidator} from '../../../../DrizzleService/types/ExerciseRow';
import {RouteFactory} from '../../../utils/RouteFactory';

export const exerciseUpsertDtoValidator = exerciseRowValidator.omit({
  userId: true,
  parentExerciseId: true,
}).extend({
  id: exerciseRowValidator.shape.id.nullable(),
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime,
}).openapi({ref: 'ExerciseUpsertDto'});

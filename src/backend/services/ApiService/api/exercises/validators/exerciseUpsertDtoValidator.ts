import {RouteFactory} from '../../../utils/RouteFactory';
import {excerciseValidatorDescriptions, exerciseValidator} from './exerciseValidator';

const validator = exerciseValidator.omit({
  userId: true,
  parentExerciseId: true,
  variations: true,
}).extend({
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  deletedAt: RouteFactory.validators.strings.datetime.nullable(),
});


export const exerciseUpsertDtoValidator = RouteFactory.validators.describeShape(validator, excerciseValidatorDescriptions)
  .openapi({ref: 'ExerciseUpsertDto'});

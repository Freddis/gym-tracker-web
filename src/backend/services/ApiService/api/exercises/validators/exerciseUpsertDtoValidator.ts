import {RouteFactory} from '../../../utils/RouteFactory';
import {excerciseValidatorDescriptions, exerciseValidator} from './exerciseValidator';
import {imageUpsertDtoValidator} from '../../entries/validators/imageUpsertDtoValidator';

const validator = exerciseValidator.omit({
  userId: true,
  parentExerciseId: true,
  variations: true,
}).extend({
  images: imageUpsertDtoValidator.array().openapi({
    description: 'Images of this exercise. Images that are attached to it already and are not listed here get detached.',
  }),
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  deletedAt: RouteFactory.validators.strings.datetime.nullable(),
});


export const exerciseUpsertDtoValidator = RouteFactory.validators.describeShape(validator, excerciseValidatorDescriptions)
  .openapi({ref: 'ExerciseUpsertDto'});

import {RouteFactory} from '../../../utils/RouteFactory';
import {exerciseValidator} from './exerciseValidator';

export const exerciseUpsertDtoValidator = exerciseValidator.omit({
  userId: true,
  parentExerciseId: true,
  muscles: true,
  variations: true,
}).extend({
  id: exerciseValidator.shape.id.nullable().openapi({description: 'Id of the exercise'}),
  createdAt: RouteFactory.validators.strings.datetime.openapi({description: 'Date of last update'}),
  updatedAt: RouteFactory.validators.strings.datetime.openapi({
    description: 'Date of deletion. Deleted exercises are not accessible to users.',
  }),
}).openapi({ref: 'ExerciseUpsertDto'});

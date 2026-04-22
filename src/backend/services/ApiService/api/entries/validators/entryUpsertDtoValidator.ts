import {literal, union} from 'zod';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutUpsertDtoValidator} from '../../workouts/validators/workoutUpsertDtoValidator';
import {entryValidator} from './entryValidator';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {weightUpsertDtoValidator} from '../../weight/validators/weightUpsertDtoValidator';

const descriptions = {
  type: 'Type of the entry',
  id: 'Id of the entry',
  time: 'Time of the entry. Can be changed by user.',
  createdAt: 'Date of the entry',
  updatedAt: 'Date of the last update',
  deletedAt: 'Date of the deletion',
  weight: 'Weight',
  visibility: 'Visibility of the entry',
  workout: 'Workout',
  image: 'Image',
};
const workoutEntryUpsertDtoValidator = entryValidator.omit({
  user: true,
}).extend({
  id: entryValidator.shape.id.optional(),
  time: RouteFactory.validators.strings.datetime,
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  deletedAt: RouteFactory.validators.strings.datetime.nullable(),
  workout: workoutUpsertDtoValidator,
  type: literal(EntryType.Workout),
});

const weightEntryUpsertDtoValidator = entryValidator.omit({
  user: true,
}).extend({
  id: entryValidator.shape.id.optional(),
  time: RouteFactory.validators.strings.datetime,
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  deletedAt: RouteFactory.validators.strings.datetime.nullable(),
  weight: weightUpsertDtoValidator,
  type: literal(EntryType.Weight),
});

const validator = union([
  RouteFactory.validators.describeShape(workoutEntryUpsertDtoValidator, descriptions).openapi({ref: 'WorkoutEntryUpsertDto'}),
  RouteFactory.validators.describeShape(weightEntryUpsertDtoValidator, descriptions).openapi({ref: 'WeightEntryUpsertDto'}),
]);

export const entryUpsertDtoValidator = validator.openapi({
  ref: 'EntryUpsertDto',
  description: 'Fields needed to update a workout',
});

import {literal, string, union} from 'zod';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutUpsertDtoValidator} from '../../workouts/validators/workoutUpsertDtoValidator';
import {entryValidator} from './entryValidator';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {weightUpsertDtoValidator} from '../../weight/validators/weightUpsertDtoValidator';
import {imageValidator} from '../../images/validators/imageValidator';

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
  title: 'Title of the entry',
  note: 'Note of the entry',
  externalId: 'External id of the entry',
  externalSource: 'External source of the entry',
};

const imageUpserDtoValidator = imageValidator.omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  url: string().nullable(),
  data: string().nullable(),
});

const baseEntryUpsertDtoValidator = entryValidator.omit({
  user: true,
  image: true,
}).extend({
  id: entryValidator.shape.id.optional(),
  time: RouteFactory.validators.strings.datetime,
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  deletedAt: RouteFactory.validators.strings.datetime.nullable(),
  image: imageUpserDtoValidator.nullable(),
});
const workoutEntryUpsertDtoValidator = baseEntryUpsertDtoValidator.extend({
  workout: workoutUpsertDtoValidator,
  type: literal(EntryType.Workout),
});

const weightEntryUpsertDtoValidator = baseEntryUpsertDtoValidator.extend({
  weight: weightUpsertDtoValidator,
  type: literal(EntryType.Weight),
});

const postEntryUpsertDtoValidator = baseEntryUpsertDtoValidator.extend({
  type: literal(EntryType.Post),
});

const validator = union([
  RouteFactory.validators.describeShape(workoutEntryUpsertDtoValidator, descriptions).openapi({ref: 'WorkoutEntryUpsertDto'}),
  RouteFactory.validators.describeShape(weightEntryUpsertDtoValidator, descriptions).openapi({ref: 'WeightEntryUpsertDto'}),
  RouteFactory.validators.describeShape(postEntryUpsertDtoValidator, descriptions).openapi({ref: 'PostEntryUpsertDto'}),
]);

export const entryUpsertDtoValidator = validator.openapi({
  ref: 'EntryUpsertDto',
  description: 'Fields needed to update a workout',
});

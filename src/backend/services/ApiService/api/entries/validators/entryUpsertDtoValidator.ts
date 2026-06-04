import {discriminatedUnion, literal, number, string} from 'zod';
import {RouteFactory} from '../../../utils/RouteFactory';
import {workoutUpsertDtoValidator} from '../../workouts/validators/workoutUpsertDtoValidator';
import {entryValidator} from './entryValidator';
import {EntryType} from '../../../../EntryService/types/EntryType';
import {weightUpsertDtoValidator} from '../../weight/validators/weightUpsertDtoValidator';
import {imageUpsertDtoValidator} from './imageUpsertDtoValidator';
import {outdoorRunUpsertDtoValidator} from './outdoorRunUpsertDtoValidator';
import {outdoorWalkUpsertDtoValidator} from './outdoorWalkUpsertDtoValidator';
import {mealUpsertDtoValidator} from './mealUpsertDtoValidator';
import {calorieGoalUpsertDtoValidator} from './calorieGoalUpsertDtoValidator';

const descriptions = {
  type: 'Type of the entry',
  id: 'Id of the entry',
  time: 'Time of the entry. Can be changed by user.',
  createdAt: 'Date of the entry',
  updatedAt: 'Date of the last update',
  deletedAt: 'Date of the deletion',
  weight: 'Weight',
  outdoorRun: 'Outdoor run',
  outdoorWalk: 'Outdoor walk',
  meal: 'Meal',
  calorieGoal: 'Calorie goal',
  visibility: 'Visibility of the entry',
  workout: 'Workout',
  image: 'Image',
  title: 'Title of the entry',
  note: 'Note of the entry',
  externalId: 'External id of the entry',
  externalSource: 'External source of the entry',
  healthkitId: 'Id of the healthkit entry',
  healthkitAnchor: 'Last sync date',
  healthkitAnchors_3_0: 'Last sync anchor',
  healthkitSource: 'Id of the app that added healthkit record',
  healthkitSourceName: 'Name of the app that added healthkit record',
  healthkitDevice: 'Id of the device that added healthkit record',
  healthkitDeviceName: 'Name of the device that added healthkit record: Apple Watch, Runkeeper, etc.',
};

const baseEntryUpsertDtoValidator = entryValidator.omit({
  user: true,
  image: true,
}).extend({
  time: RouteFactory.validators.strings.datetime,
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  deletedAt: RouteFactory.validators.strings.datetime.nullable(),
  image: imageUpsertDtoValidator.optional().nullable(),
  healthkitId: string().nullable(),
  healthkitAnchor: number().nullable(),
  healthkitAnchors_3_0: string().nullable(),
  healthkitSource: string().nullable(),
  healthkitSourceName: string().nullable(),
  healthkitDevice: string().nullable(),
  healthkitDeviceName: string().nullable(),
});

export const workoutEntryUpsertDtoValidator = baseEntryUpsertDtoValidator.extend({
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

const outdoorRunEntryUpsertDtoValidator = baseEntryUpsertDtoValidator.extend({
  outdoorRun: outdoorRunUpsertDtoValidator,
  type: literal(EntryType.OutdoorRun),
});

const outdoorWalkEntryUpsertDtoValidator = baseEntryUpsertDtoValidator.extend({
  outdoorWalk: outdoorWalkUpsertDtoValidator,
  type: literal(EntryType.OutdoorWalk),
});

const mealEntryUpsertDtoValidator = baseEntryUpsertDtoValidator.extend({
  meal: mealUpsertDtoValidator,
  type: literal(EntryType.Meal),
});

const calorieGoalEntryUpsertDtoValidator = baseEntryUpsertDtoValidator.extend({
  calorieGoal: calorieGoalUpsertDtoValidator,
  type: literal(EntryType.CalorieGoal),
});

const validator = discriminatedUnion('type', [
  RouteFactory.validators.describeShape(workoutEntryUpsertDtoValidator, descriptions).openapi({ref: 'WorkoutEntryUpsertDto'}),
  RouteFactory.validators.describeShape(weightEntryUpsertDtoValidator, descriptions).openapi({ref: 'WeightEntryUpsertDto'}),
  RouteFactory.validators.describeShape(postEntryUpsertDtoValidator, descriptions).openapi({ref: 'PostEntryUpsertDto'}),
  RouteFactory.validators.describeShape(outdoorRunEntryUpsertDtoValidator, descriptions).openapi({ref: 'OutdoorRunEntryUpsertDto'}),
  RouteFactory.validators.describeShape(outdoorWalkEntryUpsertDtoValidator, descriptions).openapi({ref: 'OutdoorWalkEntryUpsertDto'}),
  RouteFactory.validators.describeShape(mealEntryUpsertDtoValidator, descriptions).openapi({ref: 'MealEntryUpsertDto'}),
  RouteFactory.validators.describeShape(calorieGoalEntryUpsertDtoValidator, descriptions).openapi({ref: 'CalorieGoalEntryUpsertDto'}),
]);

export const entryUpsertDtoValidator = validator.openapi({
  ref: 'EntryUpsertDto',
  description: 'Fields needed to update a workout',
});

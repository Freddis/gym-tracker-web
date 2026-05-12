import {
  pgSchema,
  integer,
  varchar,
  timestamp,
  json,
  text,
  real,
  index,
  boolean,
  unique,
  jsonb,
  uuid,
  AnyPgColumn,
} from 'drizzle-orm/pg-core';
import {array, nativeEnum} from 'zod';
import {Muscle} from '../../../types/Muscle';
import {Equipment} from '../../../types/Equipment';
import {EntryType} from '../../EntryService/types/EntryType';
import {EntryVisibility} from '../../EntryService/types/EntryVisibility';
import {TranslationType} from '../../TranslationService/types/TranslationType';
import {Language} from '../../../../frontend/common/components/layout/LanguageProvider/enums/Language';
import {ImageType} from '../../../types/ImageType';
import {ExternalSource} from '../../EntryService/types/ExternalSource';
import {HeartRatePoint} from '../../OutdoorWalkService/types/HeartRatePoint';
import {PathPoint} from '../../OutdoorWalkService/types/PathPoint';
import {ServingSizeUnit} from '../../FoodService/types/ServingSizeUnit';
import {FoodAmountUnit} from '../../FoodService/types/FoodAmountUnit';
import {Gender} from '../../../types/Gender';
import {WeightUnit} from '../../../types/WeightUnit';
import {DistanceUnit} from '../../../types/DistanceUnit';
import {HeightUnit} from '../../../types/HeightUnit';
import {TemperatureUnit} from '../../../types/TemperatureUnit';
import {Country} from '../../../types/Country';
import {MealType} from '../../MealService/types/MealType';

export const gymTracker = pgSchema('gym_tracker');

const muscleValues = array(nativeEnum(Muscle)).nonempty().parse(Object.values(Muscle));
export const muscleEnum = gymTracker.enum('Muscle', muscleValues);

const equipmentValues = array(nativeEnum(Equipment)).nonempty().parse(Object.values(Equipment));
export const equipmentEnum = gymTracker.enum('Equipment', equipmentValues);

const entryTypeValues = array(nativeEnum(EntryType)).nonempty().parse(Object.values(EntryType));
export const entryTypeEnum = gymTracker.enum('EntryType', entryTypeValues);

const entryVisibilityValues = array(nativeEnum(EntryVisibility)).nonempty().parse(Object.values(EntryVisibility));
export const entryVisibilityEnum = gymTracker.enum('EntryVisibility', entryVisibilityValues);

const translationTypeEnumValues = array(nativeEnum(TranslationType)).nonempty().parse(Object.values(TranslationType));
export const translationTypeEnum = gymTracker.enum('TranslationType', translationTypeEnumValues);

const languageEnumValues = array(nativeEnum(Language)).nonempty().parse(Object.values(Language));
export const languageEnum = gymTracker.enum('language', languageEnumValues);

const imageTypeEnumValues = array(nativeEnum(ImageType)).nonempty().parse(Object.values(ImageType));
export const imageTypeEnum = gymTracker.enum('ImageType', imageTypeEnumValues);

const externalSourceValues = array(nativeEnum(ExternalSource)).nonempty().parse(Object.values(ExternalSource));
export const externalSourceEnum = gymTracker.enum('ExternalSource', externalSourceValues);

const servingSizeUnitValues = array(nativeEnum(ServingSizeUnit)).nonempty().parse(Object.values(ServingSizeUnit));
export const servingSizeUnitEnum = gymTracker.enum('ServingSizeUnit', servingSizeUnitValues);

const foodAmountUnitValues = array(nativeEnum(FoodAmountUnit)).nonempty().parse(Object.values(FoodAmountUnit));
export const foodAmountUnitEnum = gymTracker.enum('FoodAmountUnit', foodAmountUnitValues);

const genderValues = array(nativeEnum(Gender)).nonempty().parse(Object.values(Gender));
export const genderEnum = gymTracker.enum('Gender', genderValues);

const weightUnitValues = array(nativeEnum(WeightUnit)).nonempty().parse(Object.values(WeightUnit));
export const weightUnitEnum = gymTracker.enum('WeightUnit', weightUnitValues);

const distanceUnitValues = array(nativeEnum(DistanceUnit)).nonempty().parse(Object.values(DistanceUnit));
export const distanceUnitEnum = gymTracker.enum('DistanceUnit', distanceUnitValues);

const heightUnitValues = array(nativeEnum(HeightUnit)).nonempty().parse(Object.values(HeightUnit));
export const heightUnitEnum = gymTracker.enum('HeightUnit', heightUnitValues);

const temperatureUnitValues = array(nativeEnum(TemperatureUnit)).nonempty().parse(Object.values(TemperatureUnit));
export const temperatureUnitEnum = gymTracker.enum('TemperatureUnit', temperatureUnitValues);

const countryValues = array(nativeEnum(Country)).nonempty().parse(Object.values(Country));
export const countryEnum = gymTracker.enum('Country', countryValues);

const mealTypeValues = array(nativeEnum(MealType)).nonempty().parse(Object.values(MealType));
export const mealTypeEnum = gymTracker.enum('MealType', mealTypeValues);

export const argusCheckins = gymTracker.table('argus-checkins', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  externalId: varchar().notNull(),
  type: varchar().notNull(),
  subtype: varchar(),
  data: json().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const exercises = gymTracker.table('exercises', {
  id: uuid().primaryKey(),
  name: varchar().notNull(),
  description: text(),
  difficulty: integer(),
  equipment: equipmentEnum(),
  images: varchar().array().notNull(),
  params: integer().array().notNull(),
  userId: integer(),
  copiedFromId: uuid(),
  parentExerciseId: uuid(),
  isArchived: boolean().notNull().default(false),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
  index().on(table.deletedAt),
]);

export const muscles = gymTracker.table('exercise_muscles', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  muscle: muscleEnum().notNull(),
  exerciseId: uuid().notNull().references(() => exercises.id, {onDelete: 'cascade'}),
  isPrimary: boolean().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.exerciseId),
]);

export const users = gymTracker.table('users', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  password: varchar().notNull(),
  height: real().notNull(),
  heightUnit: heightUnitEnum().notNull(),
  weightUnit: weightUnitEnum().notNull(),
  temperatureUnit: temperatureUnitEnum().notNull(),
  distanceUnit: distanceUnitEnum().notNull(),
  gender: genderEnum().notNull(),
  birthDate: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  visibility: entryVisibilityEnum().notNull(),
  imageId: integer().references(() => images.id, {onDelete: 'set null'}),
  country: countryEnum().notNull(),
  note: text(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const workoutPlans = gymTracker.table('workout_plan', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar(),
  description: text(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
  index().on(table.deletedAt),
]);

export const workoutTypes = gymTracker.table('workout_type', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  planIndex: integer(),
  planId: integer().references(() => workoutPlans.id, {onDelete: 'cascade'}),
  name: varchar().notNull(),
  description: text(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
  index().on(table.deletedAt),
]);

export const workoutTypeExercises = gymTracker.table('workout_type_exercise', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  index: integer().notNull(),
  workoutTypeId: integer().notNull().references(() => workoutTypes.id, {onDelete: 'cascade'}),
  exerciseId: uuid().notNull().references(() => exercises.id, {onDelete: 'restrict'}),
  description: text(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
  index().on(table.deletedAt),
]);

export const workoutTypeExerciseSets = gymTracker.table('workout_type_exercise_sets', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  reps: integer(),
  exerciseId: uuid().notNull().references(() => exercises.id, {onDelete: 'restrict'}),
  workoutTypeId: integer().notNull().references(() => workoutTypes.id, {onDelete: 'cascade'}),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  workoutTypeExerciseId: integer().notNull().references(() => workoutTypeExercises.id, {onDelete: 'cascade'}),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.workoutTypeId),
  index().on(table.exerciseId),
  index().on(table.userId),
  index().on(table.workoutTypeExerciseId),
]);

export const workouts = gymTracker.table('workouts', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  externalId: varchar(),
  typeId: integer().references(() => workoutTypes.id, {onDelete: 'restrict'}),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  calories: real().notNull(),
  start: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  end: timestamp({withTimezone: true, mode: 'date'}),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
  index().on(table.deletedAt),
]);

export const weight = gymTracker.table('weight', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  externalId: varchar(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  weight: real().notNull(),
  units: varchar().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
  index().on(table.deletedAt),
]);

export const workoutExercises = gymTracker.table('workout_exercises', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  workoutId: integer().notNull().references(() => workouts.id, {onDelete: 'cascade'}),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  exerciseId: uuid().notNull().references(() => exercises.id, {onDelete: 'restrict'}),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
}, (table) => [
  index().on(table.workoutId),
  index().on(table.exerciseId),
  index().on(table.userId),
]);

export const workoutExerciseSets = gymTracker.table('workout_exercise_sets', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  exerciseId: uuid().notNull().references(() => exercises.id, {onDelete: 'restrict'}),
  workoutId: integer().notNull().references(() => workouts.id, {onDelete: 'cascade'}),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  workoutExerciseId: integer().notNull().references(() => workoutExercises.id, {onDelete: 'cascade'}),
  start: timestamp({withTimezone: true, mode: 'date'}),
  end: timestamp({withTimezone: true, mode: 'date'}),
  weight: real(),
  reps: integer(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.workoutId),
  index().on(table.exerciseId),
  index().on(table.userId),
  index().on(table.workoutExerciseId),
]);


export const images = gymTracker.table('images', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  url: text().notNull().unique(),
  imageType: imageTypeEnum().notNull(),
  userId: integer().references((): AnyPgColumn => users.id, {onDelete: 'set null'}),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const managers = gymTracker.table('managers', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  profilePicture: varchar(),
  password: varchar().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const entries = gymTracker.table('entries', {
  id: uuid().primaryKey(),
  externalId: varchar(),
  externalSource: externalSourceEnum(),
  title: varchar(),
  note: text(),
  type: entryTypeEnum().notNull(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  workoutId: integer().references(() => workouts.id, {onDelete: 'cascade'}),
  weightId: integer().references(() => weight.id, {onDelete: 'cascade'}),
  imageId: integer().references(() => images.id, {onDelete: 'cascade'}),
  outdoorRunId: integer().references(() => outdoorRuns.id, {onDelete: 'cascade'}),
  outdoorWalkId: integer().references(() => outdoorWalks.id, {onDelete: 'cascade'}),
  mealId: integer().references(() => meals.id, {onDelete: 'cascade'}),
  visibility: entryVisibilityEnum().notNull(),
  time: timestamp({withTimezone: true, mode: 'date'}).defaultNow().notNull(),
  healthkitId: varchar(),
  healthkitAnchor: integer(),
  healthkitAnchors_3_0: varchar(),
  healthkitSource: varchar(),
  healthkitSourceName: varchar(),
  healthkitDevice: varchar(),
  healthkitDeviceName: varchar(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const meals = gymTracker.table('meals', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  type: mealTypeEnum().notNull(),
});

export const mealFoodComponents = gymTracker.table('meal_food', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  mealId: integer().notNull().references(() => meals.id, {onDelete: 'cascade'}),
  foodId: uuid().notNull().references(() => food.id, {onDelete: 'cascade'}),
  amount: real().notNull(),
  unit: foodAmountUnitEnum().notNull(),
});

export const translations = gymTracker.table('translations', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  key: varchar().notNull(),
  numericKey: integer(),
  value: text().notNull(),
  type: translationTypeEnum().notNull(),
  language: languageEnum().notNull(),
  auto: boolean().notNull(),
  locked: boolean().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
 (table) => [
   unique().on(table.key, table.type, table.language),
   unique().on(table.numericKey, table.type, table.language),
   index().on(table.type),
   index().on(table.language, table.type, table.numericKey),
   index().on(table.language, table.type, table.key),
   index().on(table.createdAt),
   index().on(table.updatedAt),
 ]);

export const outdoorRuns = gymTracker.table('outdoor_runs', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  distance: real().notNull(),
  pace: real().notNull(),
  maxPace: real().notNull(),
  cadence: real(),
  maxCadence: real(),
  elevationGain: real(),
  heartRate: real(),
  maxHeartRate: real(),
  heartRateData: jsonb().$type<HeartRatePoint[]>(),
  geoData: jsonb().$type<PathPoint[]>(),
  duration: integer().notNull(),
  calories: integer().notNull(),
  start: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  end: timestamp({withTimezone: true, mode: 'date'}).notNull(),
});

export const outdoorWalks = gymTracker.table('outdoor_walks', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  distance: real().notNull(),
  pace: real().notNull(),
  maxPace: real().notNull(),
  cadence: real(),
  maxCadence: real(),
  elevationGain: real(),
  heartRate: real(),
  maxHeartRate: real(),
  heartRateData: jsonb().$type<HeartRatePoint[]>(),
  geoData: jsonb().$type<PathPoint[]>(),
  duration: integer().notNull(),
  calories: integer().notNull(),
  start: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  end: timestamp({withTimezone: true, mode: 'date'}).notNull(),
});

export const food = gymTracker.table('food', {
  id: uuid().primaryKey(),
  userId: integer().notNull().references(() => users.id, {onDelete: 'cascade'}),
  name: varchar().notNull(),
  description: text(),
  imageId: integer().references(() => images.id, {onDelete: 'set null'}),
  protein: real().notNull(),
  carbs: real().notNull(),
  fat: real().notNull(),
  servingSize: real(),
  servingSizeUnit: servingSizeUnitEnum().notNull(),
  isMeal: boolean().notNull().default(false),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const foodComponents = gymTracker.table('food_components', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  mealId: uuid().notNull().references(() => food.id, {onDelete: 'restrict'}),
  componentId: uuid().notNull().references(() => food.id, {onDelete: 'restrict'}),
  amount: real().notNull(),
  unit: foodAmountUnitEnum().notNull(),
});

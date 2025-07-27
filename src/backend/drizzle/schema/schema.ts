import {pgSchema, integer, varchar, timestamp, json, text, real, index, pgEnum, boolean} from 'drizzle-orm/pg-core';
import {Muscle} from '../../../common/enums/Muscle';
import {array, string} from 'zod';
import {Equipment} from '../../../common/enums/Equipment';

export const gymTracker = pgSchema('gym_tracker');

const muscleValues = array(string()).nonempty().parse(Object.values(Muscle));
export const muscleEnum = pgEnum('Muscle', muscleValues);

const equipmentValues = array(string()).nonempty().parse(Object.values(Equipment));
export const equipmentEnum = pgEnum('Equipment', equipmentValues);

export const argusCheckins = gymTracker.table('argus-checkins', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  externalId: varchar().notNull(),
  type: varchar().notNull(),
  subtype: varchar(),
  data: json().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const exercises = gymTracker.table('exercises', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar().notNull(),
  description: text(),
  difficulty: integer(),
  equipmentId: integer().notNull(),
  equipment: equipmentEnum(),
  images: varchar().array().notNull(),
  params: integer().array().notNull(),
  userId: integer(),
  copiedFromId: integer(),
  parentExerciseId: integer(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
  index().on(table.deletedAt),
]);

export const muscles = gymTracker.table('exercise_muscles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  muscle: muscleEnum().notNull().$type<Muscle>(),
  exerciseId: integer().notNull().references(() => exercises.id),
  isPrimary: boolean().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const users = gymTracker.table('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  password: varchar().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
});

// export const workoutTypes = gymTracker.table('workout_types', {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar().notNull(),
//   createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
//   updatedAt: timestamp({withTimezone: true, mode: 'date'}),
// });

export const workouts = gymTracker.table('workouts', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  externalId: varchar(),
  typeId: integer(),
  userId: integer().notNull(),
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
]
);

export const weight = gymTracker.table('weight', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  externalId: varchar(),
  userId: integer().notNull(),
  weight: real().notNull(),
  units: varchar().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
  index().on(table.deletedAt),
]
);

export const workoutExercises = gymTracker.table('workout_exercises', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  workoutId: integer().notNull().references(() => workouts.id),
  userId: integer().notNull().references(() => users.id),
  exerciseId: integer().notNull().references(() => exercises.id),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
}, (table) => [
  index().on(table.workoutId),
  index().on(table.exerciseId),
  index().on(table.userId),
]);

export const workoutExerciseSets = gymTracker.table('workout_exercise_sets', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  exerciseId: integer().notNull().references(() => exercises.id),
  workoutId: integer().notNull().references(() => workouts.id),
  userId: integer().notNull().references(() => users.id),
  workoutExerciseId: integer().notNull().references(() => workoutExercises.id),
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
  userId: integer().references(() => users.id),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
  deletedAt: timestamp({withTimezone: true, mode: 'date'}),
});

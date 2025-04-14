import {pgSchema, integer, varchar, timestamp, json, text, real, index} from 'drizzle-orm/pg-core';

export const gymTracker = pgSchema('gym_tracker');

export const entries = gymTracker.table('entries', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  externalId: varchar().notNull(),
  type: varchar().notNull(),
  subtype: varchar(),
  data: json().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const exercises = gymTracker.table('exercises', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: text(),
  difficulty: integer(),
  equipmentId: integer().notNull(),
  images: varchar().array().notNull(),
  params: integer().array().notNull(),
  userId: integer(),
  copiedFromId: integer(),
  parentExerciseId: integer(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
]
);

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
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  externalId: varchar(),
  typeId: integer(),
  userId: integer().notNull(),
  calories: real().notNull(),
  start: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  end: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
},
(table) => [
  index().on(table.userId),
]
);

export const workoutExercises = gymTracker.table('workout_exercises', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
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
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
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

import {pgSchema, integer, varchar, timestamp, json, text, real} from 'drizzle-orm/pg-core';

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
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  typeId: integer(),
  userId: integer(),
  calories: real().notNull(),
  start: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  end: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const workoutExercises = gymTracker.table('workout_exercises', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  workoutId: integer().notNull(),
  exerciseId: integer().notNull(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
});

export const workoutExerciseSets = gymTracker.table('workout_exercise_sets', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  exerciseId: integer().notNull(),
  workoutId: integer().notNull(),
  start: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  end: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  weight: real(),
  reps: integer(),
  createdAt: timestamp({withTimezone: true, mode: 'date'}).notNull(),
  updatedAt: timestamp({withTimezone: true, mode: 'date'}),
});

import {pgSchema, integer, varchar, timestamp, json, text} from 'drizzle-orm/pg-core';

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

export const exercise = gymTracker.table('exercises', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  description: text(),
  userId: integer(),
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

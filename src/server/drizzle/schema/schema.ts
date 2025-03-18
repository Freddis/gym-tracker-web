import {pgSchema, integer, varchar, timestamp, json} from 'drizzle-orm/pg-core';

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

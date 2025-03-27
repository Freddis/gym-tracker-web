import {relations} from 'drizzle-orm/relations';
import {exercise, users} from './schema';


export const exerciseRelations = relations(exercise, (relations) => ({
  user: relations.one(users),
}));

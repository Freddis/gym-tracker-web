import {relations} from 'drizzle-orm/relations';
import {exercises, users} from './schema';


export const exerciseRelations = relations(exercises, (relations) => ({
  user: relations.one(users),
}));

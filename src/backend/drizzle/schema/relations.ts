import {relations} from 'drizzle-orm/relations';
import {exercises, users, workoutExercises, workoutExerciseSets, workouts} from './schema';


export const exerciseRelations = relations(exercises, (relations) => ({
  user: relations.one(users),
}));

export const workoutRelations = relations(workouts, (relations) => ({
  user: relations.one(users),
  sets: relations.many(workoutExerciseSets),
  exercises: relations.many(workoutExercises),
}));

export const workoutExerciseRelations = relations(workoutExercises, (relations) => ({
  user: relations.one(users),
  workout: relations.one(workouts, {fields: [workoutExercises.workoutId], references: [workouts.id]}),
  exercise: relations.one(exercises, {fields: [workoutExercises.exerciseId], references: [exercises.id]}),
  sets: relations.many(workoutExerciseSets),
}));

export const workoutExerciseSetRelations = relations(workoutExerciseSets, (relations) => ({
  workout: relations.one(workouts, {fields: [workoutExerciseSets.workoutId], references: [workouts.id]}),
  workoutExercise: relations.one(workoutExercises,
    {
      fields: [workoutExerciseSets.workoutExerciseId],
      references: [workoutExercises.id],
    }
  ),
  exercise: relations.one(exercises, {fields: [workoutExerciseSets.exerciseId], references: [exercises.id]}),
}));

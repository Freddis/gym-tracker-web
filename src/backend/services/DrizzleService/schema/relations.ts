import {relations} from 'drizzle-orm/relations';
import {
  exercises,
  muscles,
  users,
  workoutExercises,
  workoutExerciseSets,
  workouts,
  workoutTypeExercises,
  workoutTypeExerciseSets,
  workoutTypes,
} from './schema';


export const exerciseRelations = relations(exercises, (relations) => ({
  user: relations.one(users),
  muscles: relations.many(muscles),
}));
export const muscleRelations = relations(muscles, (relations) => ({
  exercise: relations.one(exercises, {fields: [muscles.exerciseId], references: [exercises.id]}),
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

export const workoutTypeRelations = relations(workoutTypes, (relations) => ({
  user: relations.one(users),
  exercises: relations.many(workoutTypeExercises),
}));

export const workoutTypeExerciseRelations = relations(workoutTypeExercises, (relations) => ({
  user: relations.one(users),
  workout: relations.one(workoutTypes, {fields: [workoutTypeExercises.workoutTypeId], references: [workoutTypes.id]}),
  exercise: relations.one(exercises, {fields: [workoutTypeExercises.exerciseId], references: [exercises.id]}),
  sets: relations.many(workoutTypeExerciseSets),
}));

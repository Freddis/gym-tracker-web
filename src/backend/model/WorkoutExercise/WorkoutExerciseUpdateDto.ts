import {z} from 'zod';
import {workoutValidator} from '../Workout/Workout';
import {workoutExerciseSetUpdateDtoValidator} from '../WorkoutExerciseSet/WorkoutExerciseSetUpdateDto';

export const workoutExerciseUpdateDtoValidator = workoutValidator.shape.exercises.element.omit({
  // id: true,
  workoutId: true,
  userId: true,
  exercise: true,
  createdAt: true,
  updatedAt: true,
})
.extend({
  id: z.number().optional(),
  sets: workoutExerciseSetUpdateDtoValidator.array(),
}).openapi({ref: 'WorkoutExerciseUpdateDto'});
export type WorkoutExerciseUpdateDtoValidator = typeof workoutExerciseUpdateDtoValidator
export type WorkoutExerciseUpdateDto = z.TypeOf<WorkoutExerciseUpdateDtoValidator>

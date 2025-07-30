
import {workoutExerciseSetUpdateDtoValidator} from './workoutExerciseSetUpdateDtoValidator';
import {workoutExerciseValidator} from './workoutExerciseValidator';

export const workoutExerciseUpdateDtoValidator = workoutExerciseValidator.omit({
  workoutId: true,
  userId: true,
  exercise: true,
  createdAt: true,
  updatedAt: true,
  id: true,
})
.extend({
  sets: workoutExerciseSetUpdateDtoValidator.array(),
});


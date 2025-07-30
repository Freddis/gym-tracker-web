import {exerciseRowValidator} from '../../../../DrizzleService/types/ExerciseRow';
import {workoutExerciseRowValidator} from '../../../../DrizzleService/types/WorkoutExerciseRow';
import {workoutExerciseSetValidator} from './workoutExerciseSetValidator';

export const workoutExerciseValidator = workoutExerciseRowValidator.extend({
  exercise: exerciseRowValidator,
  sets: workoutExerciseSetValidator.array(),
}).openapi({ref: 'WorkoutExercise'});

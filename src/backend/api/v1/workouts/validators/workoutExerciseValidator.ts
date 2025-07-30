import {exerciseRowValidator} from '../../../../services/DrizzleService/types/ExerciseRow';
import {workoutExerciseRowValidator} from '../../../../services/DrizzleService/types/WorkoutExerciseRow';
import {workoutExerciseSetValidator} from './workoutExerciseSetValidator';

export const workoutExerciseValidator = workoutExerciseRowValidator.extend({
  exercise: exerciseRowValidator,
  sets: workoutExerciseSetValidator.array(),
}).openapi({ref: 'WorkoutExercise'});

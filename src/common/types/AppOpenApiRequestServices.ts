import {AuthService} from 'src/backend/services/AuthService/AuthService';
import {EntryService} from 'src/backend/services/EntryService/EntryService';
import {ExerciseService} from 'src/backend/services/ExerciseService/ExerciseService';
import {WorkoutService} from 'src/backend/services/WorkoutService/WorkoutService';
import {WeightService} from '../../backend/services/WeightService/WeightService';

export interface AppOpenApiRequestServices {
  auth: AuthService
  models: {
    entry: EntryService
    exercise: ExerciseService
    workout: WorkoutService
    weight: WeightService
  }
}
